const express = require('express');
const Model = require('../model/model');

const router = express.Router()

module.exports = router;

//Post Method
router.post('/post', (req, res) => {
    const data = new Model({
        name:req.body.name,
        age:req.body.age
    })
    try{
        const dataToSave = data.save();
        res.status(200).json(dataToSave);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

//Get all Method
router.get('/getAll', async(req, res) => {
    try{
        const data = await Model.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message:error.message});
    }
})

//Get by ID Method
router.get('/getOne/:id', async(req, res) => {
    try{
        const data = await Model.findById(req.params.id);
        res.json(data);
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

//Update by ID Method
router.patch('/update/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new:true};

        const result = await Model.findByIdAndUpdate(id,updatedData,options);

        res.send(result);
    }
    catch(error){
        res.status(400).json({message:error.message});
    }
})

//Delete by ID Method
router.delete('/delete/:id', async(req, res) => {
    try{
        const id = req.params.id;
        const deleted = await Model.findByIdAndDelete(id);

        res.send(`Data with name ${deleted.name} has been deleted successfully`);
    }
    catch{
        res.status(400).json({message:error.message});
    }
})
const Task = require('../models/task')

const getAllTasks = async (req,res)=>{
    try {
        const task = await Task.find({"completed": false})
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const createTask = async (req,res)=>{
    //const task = await Task.create({name: "watch digimon"})
    // res.send('Create Task')
    // const task = await Task.create(req.body)
    // res.json(task)
    try {
        const task = await Task.create(req.body)
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const getTask = async (req,res)=>{
    // res.send('Get Task')
    // res.json({id:req.params})
    try {
        const task = await Task.find({"_id": req.params.id});
        res.status(201).json({task});
    } catch (error) {
        res.status(500).json({msg:error})
    }
}
const updateTask = (req,res)=>{
    res.send('Update Task')
}
const deleteTask = (req,res)=>{
    res.send('Delete Task')
}
module.exports = {getAllTasks, createTask, getTask, updateTask, deleteTask}
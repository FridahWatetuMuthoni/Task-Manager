const Task = require('../models/Task')

const getAllTasks = async (req, res) => {
    try{
        const all_tasks = await Task.find().exec()
        if(!all_tasks) return res.status(204).json({'message':"No Tasks Found"})
        res.status(200).json(all_tasks)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':`Name:${err?.errors?.name?.name} Message: ${err?.errors?.name?.message}`})
    }
    }

const createNewTask =async (req, res) => {
    /*if(!req?.body?.name || !req?.body?.completed){
        return res.status(400).json({"message":"You must include the Name and Completed"})
    }*/
    try{
        const task = await Task.create({name:req.body.name,completed:req.body.completed})
        res.status(201).json(task)
    }
    catch(err){
        console.log(err)
        res.status(500).json({'message':`Name:${err?.errors?.name?.name} Message: ${err?.errors?.name?.message}`})
    }
    
}

const updateTask =async (req, res) => {
    const id =req.params.id
    if(!id) return res.status(400).json({"message":"You must include an id"})
    try{
        const task = await Task.findOne({_id:id}).exec()
        if(!task) return res.status(204).json({"message":`No Task matches ${id}`})
        if(req?.body?.name) task.name = req.body.name
        if(req?.body?.completed) task.completed = req.body.completed
        const result = await task.save()
        res.json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message":"Incorrect id passed as the parameter"})
    }
}

const deleteTask = async (req, res) => {
    const id =req.params.id
    try{
        const get_task = await Task.findOne({_id:id}).exec()
        if(!get_task) return res.status(404).json({"message":`No task with id ${id}`})
        const result = await get_task.deleteOne({_id:id})
        res.staus(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message":"Incorrect id passed as the parameter"})
    }

}

const getSingleTask = async (req, res) => {
    const id =req.params.id
    try{
        const get_task = await Task.findOne({_id:id}).exec()
        if(!get_task) return res.status(404).json({"message":`No task with id ${id}`})
        res.status(200).json(get_task)
    }
    catch(err){
        console.log(err)
        res.status(500).json({"message":"Incorrect id passed as the parameter"})
    }

}

module.exports={getAllTasks,createNewTask,updateTask,deleteTask,getSingleTask}
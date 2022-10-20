const Task = require('../models/Task')
const asyncWrapper = require("../middleware/async")

//GET ALL THE TASKS 
//The asyncWrapper enables us not to always write a try and catch block
const getAllTasks = asyncWrapper(async (req, res) => {
    let result = Task.find({})
    const sort = '-name'
    if (sort) {
        result = result.sort(sort)
    }
    const tasks = await result
    res.status(200).json({ tasks })
//NOTES
//Getting all the item names that contains an 'm' in them and console logging them: the 'i' in options makes the sort case insensitive
    const name = "m"
    //select is used to get the fields that you want included in your tasks...
    //The below example returns only the name and id field and omits the rest
    const all_tasks = await Task.find({ name: { $regex: name, $options: 'i' } }).select('name')
    console.log(all_tasks)
    //chaining sort,select and limit together
    const sorted_list = await Task.find({}).sort('name').select("completed").limit(5)
    console.log(sorted_list, sorted_list.length)
}
)


//GET A SINGLE TASK
const getSingleTask = async (req, res) => {
    const id =req?.params?.id
    try{
        const get_task = await Task.findOne({_id:id}).exec()
        if(!get_task) return res.status(404).json({message:`No task with id ${id}`})
        res.status(200).json({task:get_task})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Incorrect id passed as the parameter"})
    }

}

//CREATING A NEW TASK
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
        res.status(500).json({message:`Name:${err?.errors?.name?.name} Message: ${err?.errors?.name?.message}`})
    }
    
}
//Updating a task
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
        res.status(500).json({message:"Incorrect id passed as the parameter"})
    }
}

//DELETING A TASK
const deleteTask = async (req, res) => {
    const id =req.params.id
    try{
        const get_task = await Task.findOne({_id:id}).exec()
        if(!get_task) return res.status(404).json({message:`No task with id ${id}`})
        const result = await get_task.deleteOne({_id:id})
        res.status(200).json(result)
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Incorrect id passed as the parameter"})
    }

}

module.exports={getAllTasks,createNewTask,updateTask,deleteTask,getSingleTask}
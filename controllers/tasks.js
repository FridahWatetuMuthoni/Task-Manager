const getAllTasks = (req, res) => {
    res.send('Getting All the Tasks')
}

const createNewTask = (req, res) => {
    res.json(req.body)
}

const updateTask = (req, res) => {
    res.send(`The id is in the parameter which is ${req.params.id}`)
}

const deleteTask = (req, res) => {
    res.send('Deleting a task')
}

const getSingleTask = (req, res) => {
    res.send('Getting a single task')
}

module.exports={getAllTasks,createNewTask,updateTask,deleteTask,getSingleTask}
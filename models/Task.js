const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: String,
    completed:Boolean
})

//mongoose.model(Name, Schema)
module.exports=mongoose.model('Task',TaskSchema)
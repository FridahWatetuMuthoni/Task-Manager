const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must Provide a name"],
        trim:true, //removing white space
        maxlength:[40,'Name can not be more than 20 charaters']
    },
    completed:{
        type:Boolean,
        default:false
    }
})

//mongoose.model(Name, Schema)
module.exports=mongoose.model('Task',TaskSchema)
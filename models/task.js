const mongoose = require('mongoose')

// //So what is a schema?
// const TASKSCHEMA = new mongoose.Schema({
//     name: String,
//     completed: Boolean
// })
// //This is basic validation not advanced

const TASKSCHEMA = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Must Provide Your Name"],
        trim: true,
        maxlength:[20,'Name Cannot Be more than 20 Characters'],
    },
    completed:{
            type:Boolean,
            default: false,
        }
})

module.exports = mongoose.model('Task', TASKSCHEMA)
const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const TodoSchema = new Schema({
    todoid: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        default : ""
    },
    tododescription:{
        type: String,
        default:""
    },
    dueDate:{
        
        type: Date,
    },
    date : {
        type: Date,
        default: Date.now
    },
    label:{
         type:String,
         default :""
    },
   done:{
       type: String,
   }

});

module.exports = Todo = mongoose.model("todo",TodoSchema);
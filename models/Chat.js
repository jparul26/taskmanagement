const mongoose = require("mongoose");
const Schema =mongoose.Schema;

const ChatSchema = new Schema({
    author: {
        type: String,
        required: true
    },
    postText: {
        type: String,
        required: true
    },
    Date : {
        type: Date,
        requires: true
    }
    

});

module.exports = Chat = mongoose.model("chats",ChatSchema)
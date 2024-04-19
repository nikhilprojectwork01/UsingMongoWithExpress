const mongoose = require('mongoose');


const schemas = new mongoose.Schema({
    from: {
        type: String,
        require:true,
    },
    to:{
        type:String,
        requires:true,
    },
    message: {
        type:String,
        maxLength: 200,
    },
    created_at:{
        type:Date,
        required:true
    }
});

const Chat =  mongoose.model("Chat" , schemas);

module.exports = Chat ;
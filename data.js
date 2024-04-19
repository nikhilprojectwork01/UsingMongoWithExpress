const mongoose = require('mongoose');
main().then(res=>{
    console.log("connection is establish with Database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
const Chat = require("./models/chat.js");


Chat.insertMany([
    {
        from:"rishabh",
        to:"Nikhil",
        message:"Hello Where r u",
        created_at:new Date(),
    },
    {
        from:"Nikhil",
        to:"Arpita",
        message:"how much time will you take ",
        created_at:new Date(),
    },
    {
        from:"rishabh",
        to:"Nikhil",
        message:"Hello Where r u",
        created_at:new Date(),
    },
    {
        from:"rishabh",
        to:"Nikhil",
        message:"Hello Where r u",
        created_at:new Date(),
    
},
{
        from:"papa",
        to:"Nikhil",
        message:"take some sweet 1kg kaju katlai",
        created_at:new Date(),
    },

    {
        from:"arpita",
        to:"Nikhil",
        message:"take som evegitable while returning from office",
        created_at:new Date(),
    }

]).then(res=>{
    console.log("data saved successfully");
}).catch(err=>{
    console.log(err);
})
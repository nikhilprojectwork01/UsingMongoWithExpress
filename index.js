const express = require("express");
const Chat = require("./models/chat.js");
let app = express();
var methodOverride = require('method-override');
app.use(methodOverride('_method'))
let port = 8080 ;
let path = require("path")
const ExpressError = require("./Epresserror.js");
app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "/views"));

app.use(express.static("/public"));
app.use(express.static(path.join(__dirname , "/public")));

app.use(express.urlencoded({extended:true}));
const mongoose = require('mongoose');

main().then(res=>{
    console.log("connection is establish with Database");
}).catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Whatsapp');
}
app.listen(port , ()=>{
    console.log("Connection is Establish With the port 8080");
})
app.get("/" , (req,res)=>{
    res.send("Root Path")
})
app.get("/chats" , async(req,res)=>{
    let data  = await Chat.find();
    res.render("index.ejs" , {data});
})
app.get("/chats/new" , (req,res)=>{
    res.render("form.ejs");
})
function asyncwrap(fn){
    return function(req,res,next){
        fn(req,res,next).catch((err)=>{
            next(err);
        })
    }
}
app.post("/chats/add" , (req,res)=>{
    let{from , to , message} = req.body ;
    let user1 = new Chat({
        from : from ,
        to : to ,
        message : message,
        created_at : new Date()
    })
    user1.save().then(res=>{
        console.log("Data Saved Successfully");
    }).catch(err =>{
        console.log(err);
    })
    res.redirect("/chats");
})
app.get("/show/:id" ,asyncwrap( async(req,res ,next)=>{
        let{id} = req.params;
    let data = await Chat.findById(id);
    if(!data){
        next( new ExpressError(404 , "Chat Not found"));
    }
    res.render("show.ejs" , {data})
}));

app.get("/chats/:id/edit" ,asyncwrap( async(req,res)=>{
        let {id} = req.params;
    let info =await Chat.findById(id);
    res.render("editform.ejs" , {info});
    if(!info){
        next(new ExpressError(404 , "Page not Found"));
    }
}))
app.patch("/chats/:id/add" , async(req,res)=>{
    try{
        let {id} = req.params ;
    let{newmessage} = req.body;
   await Chat.findByIdAndUpdate(id , {message:newmessage} , {runValidators:true,  new:true});
   res.redirect("/chats");
    }catch(err){
        next(err);
    }
})

app.delete("/chats/:id/delete" , async(req,res)=>{
    let {id} = req.params ;
   await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
})
app.use((err,req,res , next)=>{
    let{status = 500 , message = "Not found"} = err ;
    res.status(status).send(message);
})
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Db connected");
});


app.get("/", (req,res)=>{
    res.send("Books");
});

app.post("/book", (req,res)=>{
    res.send("Books");
});

app.listen(4545, ()=>{
    console.log("Running books service");
});
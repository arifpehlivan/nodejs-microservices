const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");

dotenv.config();

mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Db connected customer service");
});


app.listen("5555", ()=>{
    console.log("Customers service");
});
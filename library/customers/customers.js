const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");

app.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Db connected customer service");
});

require("./Customer");
const Customer=mongoose.model("Customer");


app.post("/customer", (req,res)=>{
    const newCustomer={
        name:req.body.name,
        age:req.body.age,
        address:req.body.address
    }
    const customer=new Customer(newCustomer);

    customer.save().then(()=>{
        res.send("Customer created");
    }).catch((err)=>{
        console.log(err);
    });
})

app.listen("5555", ()=>{
    console.log("Customers service");
});
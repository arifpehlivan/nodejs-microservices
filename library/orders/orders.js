const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

app.use(bodyParser.json());

dotenv.config();

mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Db connected Order");
});

require("./Order");
const Order=mongoose.model("Order");

app.post("/order", (req,res)=>{
    const newOrder={
        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        BookID:mongoose.Types.ObjectId(req.body.BookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate
    }
    const order=new Order(newOrder);
    order.save().then(()=>{
        res.send("Order created");
    }).catch((err)=>{
        console.log(err);
    })

})

app.listen(7777, ()=>{
    console.log("Orders service");
});
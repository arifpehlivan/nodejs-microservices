const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const axios=require("axios");

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

});

app.get("/order/:id", (req,res)=>{
    Order.findById(req.params.id).then((order)=>{
        if(order){
            axios.get("http://localhost:5555/customer/" + order.CustomerID).then((response)=>{
                const orderObject={customerName:response.data.name, bookTitle:""}
                axios.get("http://localhost:4545/book/" + order.BookID).then((response)=>{
                    orderObject.bookTitle=response.data.title;
                    res.json(orderObject);
                })
            })
        } else{
            res.send("Invalid Order");
        }
    })
    
});

app.listen(7777, ()=>{
    console.log("Orders service");
});
const mongoose=require("mongoose");

mongoose.model("Customer",{
    name:{
        type:String,
        require:true,
    },
    age:{
        type:Number,
        reuire:true
    },
    address:{
        type:String,
        require:true
    }
});

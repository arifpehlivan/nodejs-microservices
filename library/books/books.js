const express=require("express");
const app=express();
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const bodyParser=require("body-parser");

dotenv.config();
app.use(bodyParser.json());

require("./Book");
const Book=mongoose.model("Book");

mongoose.connect(process.env.MONGODB, ()=>{
    console.log("Db connected");
});


app.get("/", (req,res)=>{
    res.send("Book service");
});

app.post("/book", (req,res)=>{
    const newBook={
        title:req.body.title,
        author:req.body.author,
        numberPages:req.body.numberPages,
        publisher:req.body.publisher
    }

    const book=new Book(newBook);
    book.save().then(()=>{
        console.log("New book created.");
    }).catch((err)=>{
        console.log(err);
    });
    res.send(book);
});

app.get("/books", (req,res)=>{
    Book.find().then((books)=>{
        res.json(books);
    }).catch((err)=>{
        console.log(err);
    })
});

app.get("/book/:id", (req,res)=>{
    Book.findById(req.params.id).then((book)=>{
        res.json(book);
    }).catch((err)=>{
        console.log(err);
    })
})

app.listen(4545, ()=>{
    console.log("Running books service");
});
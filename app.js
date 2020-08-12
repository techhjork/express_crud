const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
require('dotenv').config();

const Crud = require('./model/Crud');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname) + "Public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@techhcluster.7lflw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const support = {
	 useNewUrlParser:true,
	 useUnifiedTopology:true,
     useFindAndModify:false
}
 mongoose.connect(url,support,(err)=>{
  if(err) throw err;
  else console.log("database Connected")
})

app.get("/",(req,res)=>{
	Crud.find({},(err,data)=>{
     if(err) throw err;
     else res.render("index",{datas:data});
	})
})
app.post("/",(req,res)=>{
	const data = {
       email:req.body.email,
       password:req.body.password
	}
	Crud.create(data,(err,crud)=>{
		if(err) throw err;
		else console.log(crud)
	})
	res.redirect("/")
})

app.delete("/delete/:id",(req,res)=>{
  Crud.findByIdAndRemove(req.params.id,(err)=>{
  	if(err) throw err;
    else console.log("Deleted : " + req.params.id);
  })
  res.redirect("/")
})

app.get("/update/:id",(req,res)=>{
 Crud.findById(req.params.id,(err,user)=>{
    if(err) throw err;
 	else res.render("update",{user:user})
 })
})

app.put("/update/:id",(req,res)=>{
	Crud.findByIdAndUpdate(req.params.id,{
        email:req.body.email,
        password:req.body.password
	},(err,user)=>{
		if(err) throw err;
		else res.redirect("/");
	})
})

const port = process.env.PORT || 3000
app.listen(port,(err)=>{
	if(err) throw err;
	else console.log("Connected")
})
const express = require("express");
const path = require("path");
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname) + "Public"))
app.set("view engine","ejs")
app.use(methodOverride("_method"))
const url = `mongodb+srv://TechhUser:TechhPass@techhcluster.7lflw.mongodb.net/TechhDB?retryWrites=true&w=majority`
const support = {
	 useNewUrlParser:true,
	 useUnifiedTopology:true,
     useFindAndModify:false
}
 mongoose.connect(url,support,(err)=>{
  if(err) throw err;
  else console.log("database Connected")
})

const crudSchema = mongoose.Schema({
 email:{
 	type:String,
 	required:true
 },
 password:{
 	type:String,
 	required:true
 }
})

const crud = mongoose.model("crud",crudSchema);

app.get("/",(req,res)=>{
	crud.find({},(err,data)=>{
     if(err) throw err;
     else res.render("index",{datas:data});
	})
})
app.post("/",(req,res)=>{
	const data = {
       email:req.body.email,
       password:req.body.password
	}
	crud.create(data,(err,crud)=>{
		if(err) throw err;
		else console.log(crud)
	})
	res.redirect("/")
})

app.delete("/delete/:id",(req,res)=>{
  crud.findByIdAndRemove(req.params.id,(err)=>{
  	if(err) throw err;
    else console.log("Deleted : " + req.params.id);
  })
  res.redirect("/")
})

app.get("/update/:id",(req,res)=>{
 crud.findById(req.params.id,(err,user)=>{
    if(err) throw err;
 	else res.render("update",{user:user})
 })
})

app.put("/update/:id",(req,res)=>{
	crud.findByIdAndUpdate(req.params.id,{
        email:req.body.email,
        password:req.body.password
	},(err,user)=>{
		if(err) throw err;
		else res.redirect("/");
	})
})

const port = process.env.Port || 3000
app.listen(port,(err)=>{
	if(err) throw err;
	else console.log("Connected")
})
const mongoose = require("mongoose");

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


module.exports = Crud = mongoose.model("crud",crudSchema);
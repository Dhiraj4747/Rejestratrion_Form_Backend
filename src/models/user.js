const mongoose = require("mongoose")

const LoginSchema = new mongoose.Schema({
   name:{
      type:String,
      required:true
   },
   password:{
      type:String,
      required:true
   }
},{timestamps:true})

const collection = mongoose.model("user",LoginSchema)

module.exports= collection
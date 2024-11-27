require('dotenv').config()
const express = require("express")
const path = require("path")
const collection = require("./models/user")
const {mongooseConnection} = require("./connection")
const bcrypt = require("bcrypt")

const app = express();
const port = process.env.PORT || 3000
const mongoconnect = process.env.MONGODB

mongooseConnection(mongoconnect)

app.set("view engine","ejs")
app.set("views", path.join(__dirname, "views"));

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(express.static(path.join(__dirname,'..',"public")));

app.get("/",(req,res)=>{
   console.log("hii Dhiraj Boss")
})

app.get("/login",(req,res)=>{
   res.render("login")
})

app.get("/signup",(req,res)=>{
   res.render("signup")
})

app.post("/signup",async (req,res)=>{
   const data ={
      name: req.body.userName,
      password:req.body.password
   }

   // check if user already exist inthe datadbse
   const existingUser = await collection.findOne({name:data.name})
   if(existingUser){
      console.log("user Already Exist")
      
   }else{
      const saltround = 10;
      const hashedpassword = await bcrypt.hash(data.password,saltround);
      data.password = hashedpassword;
      const userdata = await collection.create(data);
      console.log("userdata is = ",userdata)
   }
})

// to hashed the password

app.listen(port,(req,res)=>{
   console.log(`http://localhost:${port}`)
})
const mongoose = require("mongoose")

async function mongooseConnection(url) {
   try {
      await mongoose.connect(url)
      console.log("MongoDB connected successfully");
      
   } catch (err) {
      console.error("Connection failed", err);
   }
}
module.exports = {
   mongooseConnection
}
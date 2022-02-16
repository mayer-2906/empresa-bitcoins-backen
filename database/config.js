const res = require('express/lib/response');
const mongoose = require('mongoose')

const dbConection = async () => {
  try {  
    await mongoose.connect('mongodb+srv://admin:SBpFbcQUeHGAJelu@cluster0.yznfd.mongodb.net/db-app-bitcoins',{
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    //res.json({
    //  ok:200
    //})
    console.log("db online");
  
  }catch(e){
    //res.json({
    //  ok:400
    //})
   console.log("Error of conection",e) 
  }
}

module.exports = {
  dbConection
}
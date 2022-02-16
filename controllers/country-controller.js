const {response} = require('express')

const Country = require('../models/country-model')

const getCountry = async (resq,res=response) => {

  const uid = resq.params.id
  try{
    const countrys = await Coin.find(uid)
                                .populate('coins','name symbol value')
    console.log();
    res.json({
      ok:200,
      countrys
    })
  }catch(e){
    res.json({
      ok:400,
      msg:e.message,
    })
  }  
}

const createCountry = async (req, res=response) => {


  try {
    const { name } = req.body

    const isCountryExist = await Country.findOne({ name})

    if(isCountryExist){
      res.status(500).json({
        ok:500,
        message: "country Exist"
      })
    }else{
      const country = new Country(req.body);

      //save country
      await country.save();

      res.json({
        ok:200,
        msg:"country create",
        country
      })
    }  
  }catch(e){
    res.json({
      ok:400,
      msg:"Error of create country",
      error: e.message
    })
  }
  
}

const updateCountry = async (req, resp=response) => {

  const uid=req.params.id

  try{
    const country = await Country.findOne(uid)
    if(!country){
      return resp.status(404).json({
        ok:false,
        message:"country not exits"
      })
    }

    const newName = req.body.newName;
    if(country.name !== newName){     
      const isExistCountry= await Country.findOne({name:newName})
      if(isExistCountry){
        return resp.status(500).json({
          ok:false,
          message: "There is already a country with that name "
        })
      }
    }

    const countryUpdate = await Country.findByIdAndUpdate(uid,req.body,{new:true});
    
    resp.json({
      ok:200,
      userUpdate
    })
  }catch(e){
    resp.status(500).json({
      ok:false,
      message: "connection failed",
      errors: e.message
    })
  }
  
}

const deleteCountry = async (req, resp=response) => {
  const uid = req.params.id;
  try{    
    const country = await Country.findById(uid);
    if(!country){
      return resp.status(500).json({
        ok:false,
        message: "country does not exits"
      })
    }
    await Country.findByIdAndDelete(uid)
    resp.json({
      ok:true,
      message:"delete country"
    }) 
  }catch(e){
    resp.status(500).json({
      ok:false,
      message:`talk with admin`
    }) 
  }
}

module.exports = { 
  getCountry,
  createCountry,
  updateCountry,
  deleteCountry
}
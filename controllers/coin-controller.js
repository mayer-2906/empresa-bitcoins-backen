const {response} = require('express')

const Coin = require('../models/coin-model')

const getCoins = async (resq,res=response) => {

  try{
    const coins = await Coin.find()
                                
    console.log();
    res.json({
      ok:200,
      coins
    })
  }catch(e){
    res.json({
      ok:400,
      msg:e.message,
    })
  }  
}

const createCoin = async (req, res=response) => {


  try {
    const { symbol } = req.body

    const isCoinExist = await Coin.findOne({ symbol })

    if(isCoinExist){
      res.status(500).json({
        ok:500,
        message: "coin Exist"
      })
    }else{
      const coin = new Coin(req.body);

      //save coin
      await coin.save();

      res.json({
        ok:200,
        msg:"coin create",
        coin
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

const updateCoin = async (req, resp=response) => {

  const uid=req.params.id

  try{
    const coin = await Coin.findById(uid)
    if(!coin){
      return resp.status(404).json({
        ok:false,
        message:"coin not exits"
      })
    }

    //const value = req.body.newValue;

    const coinUpdate = await Coin.findByIdAndUpdate(uid,req.body,{new:true});    
    resp.json({
      ok:200,
      coinUpdate
    })
  }catch(e){
    resp.status(500).json({
      ok:false,
      message: "connection failed",
      errors: e.message
    })
  }
  
}


const deleteCoin = async (req, resp=response) => {
  const uid = req.params.id;
  try{    
    const coin = await Coin.findById(uid);
    if(!coin){
      return resp.status(500).json({
        ok:false,
        message: "coin does not exits"
      })
    }
    await Coin.findByIdAndDelete(uid)
    resp.json({
      ok:true,
      message:"delete coin"
    }) 
  }catch(e){
    resp.status(500).json({
      ok:false,
      message:`talk with admin`
    }) 
  }
}

module.exports = { 
  getCoins,
  createCoin,
  updateCoin,
  deleteCoin
}
const { Schema, model} = require('mongoose');

const coinSchema = Schema({
  name:{
    type: String,
    required: true,
  },
  symbol:{
    type: String,
    required: true,
    unique: true,
  },
  value:{
    type: String,
    required: true,
  }
});

coinSchema.method('toJSON', function(){
  const {__v, _id, ...object} = this.toObject();
  object.uid=_id;
  return object;
})

module.exports = model('Coin', coinSchema)
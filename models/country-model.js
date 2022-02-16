const { Schema, model} = require('mongoose');

const countrySchema = Schema({
  name:{
    type: String,
    required: true,
    unique: true
  },
  users:{
    type: Schema.Types.ObjectId,
    ref: 'User',
    //required: true
  },
  coins:{
    type: Schema.Types.ObjectId,
    ref:'Coin',
    //required: true,
  },
  //gestorasMonedas:{
  //  type: Schema.Types.ObjectId,
  //  ref:'Coin',
  //  //required: true,
  //}
});

countrySchema.method('toJSON', function(){
  const {__v, _id, ...object} = this.toObject();
  object.uid=_id;
  return object;
})

module.exports = model('Country', countrySchema)
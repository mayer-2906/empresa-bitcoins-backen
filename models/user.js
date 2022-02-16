const { Schema, model} = require('mongoose');

const userSchema = Schema({
  name:{
    type: String,
    required: true,
  },
  email:{
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  country:{
    type: Schema.Types.ObjectId,
    ref:'Country',
    required: true,
  },
  coins:{
    type: Array,
    of: Schema.Types.ObjectId,
    ref:'Coin',    
    required: false,
  }
});

userSchema.method('toJSON', function(){
  const {__v, _id, password, ...object} = this.toObject();
  object.uid=_id;
  return object;
})
module.exports = model('User', userSchema)
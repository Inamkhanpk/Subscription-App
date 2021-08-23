const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Offer = new mongoose.Schema({
  offername: {
    type: String,
    
  },
  category: {
    type: String,
    
  },
  subcategory: {
    type: String,
    
  },
  thumbnail: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  LinktoOffer: {
    type: String,
    
    
  },
  events:{
    type:String,
    default:'Impression'
  },

  price: {
    type: String,
  },
  uploader:{
    type: ObjectId,
    ref: 'Users'
  }
,
  companyid:{
    type: ObjectId,
    ref: 'Company'
  },
  token:{
    type: String,
  },
  date: { type: Date, default: Date.now  },
  buyer:{
    type:String,
    ref:'Users'
  }
  
});

module.exports = mongoose.model('Offer', Offer);
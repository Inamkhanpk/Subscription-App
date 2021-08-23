const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const Company = new mongoose.Schema({
  companyname: {
    type: String,
    
  },
  category: {
    type: String,
    
  },
  thumbnail: {
    type: String,
    
  },
  description: {
    type: String,
    
  },
  address1: {
    type: String,
    
  },
  address2: {
    type: String,
    
    
  },

  email: {
    type: String,
  },
  designation:{
    type:String,
    
  },
  phoneno:{
    type:String,
    
  },
  contactperson:{
    type:String,
  },
  uploader: {
    type: ObjectId,
    ref: 'Users'
    },
});

module.exports = mongoose.model('Company', Company);
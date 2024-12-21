const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
    Token:{
        type:String
    }
},{timestamps:true});


  module.exports = mongoose.model('BlacklistedToken',tokenSchema);

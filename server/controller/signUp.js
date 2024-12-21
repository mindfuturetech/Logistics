const express = require('express');
const app= express();
// const router= express.Router();
const User = require('../models/User');
const generator = require('generate-password');


//SignUp Route
const signup = async(req,res)=>{
const {username, profile} = req.body;

try{
const existingUser = await User.findOne({username});

if(existingUser){
    return res.status(400).json({message:'Username already exists'});
}

const password = generator.generate({
    length: 8,
    numbers: true,
    symbols: false,
    uppercase: true,
    lowercase: true,
    strict: true  // ensure at least one character from each pool
});

const user = await User.create({username,password,profile});

res.status(201).json({ 
    message: 'User created successfully',
});


}catch(error){
    res.status(500).json({message: 'Internal server error'});
}

};


module.exports = signup;

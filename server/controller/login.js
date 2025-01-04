const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;


const login = async(req,res)=>{

    const {username,password} = req.body;

    try{
        const user = await User.findOne({username});

        if(!user){
            return res.status(400).json({message:'User not found'});
        }
        if(user.password !== password){
            return res.status(400).json({message:'Invalid password'});
        }
        
        const token = jwt.sign({userId:user._id, username: user.username},JWT_SECRET,{expiresIn:'1d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true, //process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: 'None',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 days
        });

        res.status(200).json({message:'Login successful'});
    }catch(error){
        console.log(error);
        res.status(500).json({message:'Internal server error'});
    }
}


module.exports = login;

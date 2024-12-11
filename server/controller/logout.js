const express = require('express');
const BlacklistedToken = require('../models/BlacklistedTokens');


const JWT_SECRET = process.env.JWT_SECRET;

const logout = async(req,res)=>{
    const token = req.cookies.token;
    
    try{
        if(token){
            const blacklistedToken = new BlacklistedToken({Token:token});
            await blacklistedToken.save();
        }
    res.clearCookie('token');
        res.status(200).json({message:'Logged out successfully'});
    }catch(error){
        res.status(500).json({message:'Error Logging out'});
    }
}

module.exports = logout;


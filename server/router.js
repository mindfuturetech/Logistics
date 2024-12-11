const express = require('express');
const router = express.Router();

//Function imports
const signup = require('./controller/signUp');
const login= require('./controller/login');
const resetPassword =  require('./controller/resetPassword');
const auth = require('./Authentication/Auth');
const logout = require('./controller/logout');
//Routes
router.get('/check-auth',auth);
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout', logout);  // Add this line
router.post('/reset-password',resetPassword);

module.exports = router;

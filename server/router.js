const express = require('express');
const router = express.Router();

//Function imports
const signup = require('./controller/signUp');
const login = require('./controller/login');
const resetPassword =  require('./controller/resetPassword');

//Routes
router.post('/signup',signup);
router.post('/login',login);
router.post('/reset-password',resetPassword);

module.exports = router;

const express = require('express');
const router = express.Router();

//Function imports
const signup = require('./controller/signUp');
const login = require('./controller/login');

//Routes
router.post('/signup',signup);
router.post('/login',login);

module.exports = router;

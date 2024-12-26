const express = require('express');
const router = express.Router();
const imageUpload = require('./multer/imageMulter')

//Function imports
const signup = require('./controller/signUp');
const login= require('./controller/login');
const resetPassword =  require('./controller/resetPassword');
const auth = require('./Authentication/Auth');
const logout = require('./controller/logout');
const {reports, getTruckData, getVendorData, getDestinationData , getTableData, updateTripData, downloadFile} = require('./controller/reports');
//Routes
router.get('/check-auth',auth);
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout', logout);  // Add this line
router.post('/reset-password',resetPassword);
router.post('/reports',reports);
router.get('/api/trucks',getTruckData);
router.get('/api/vendors',getVendorData);
router.get('/api/destination', getDestinationData);
router.get('/api/reports', getTableData);
router.post('/api/reports/:id',imageUpload, updateTripData);
router.get(`/api/download/:id/:field`, downloadFile )

module.exports = router;

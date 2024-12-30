const express = require('express');
const router = express.Router();

const imageUpload = require('./multer/imageMulter')
const signup = require('./controller/signUp');
const login= require('./controller/login');
const resetPassword =  require('./controller/resetPassword');
const auth = require('./Authentication/Auth');
const logout = require('./controller/logout');
const freightController = require('./controller/freight');
const vehicleController = require('./controller/vehicle');
const vendorController = require('./controller/vendor');
const transactionsController = require('./controller/transactions');
const generateBillController = require('./controller/generateBill')

const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const truckNo = req.body.truckNo;
        const dir = path.join(__dirname, "upload", truckNo);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
});

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

// freight
router.get("/list-freight", freightController.ListFreight);
router.post("/add-freight", freightController.AddFreight);
router.post("/update-freight", freightController.UpdateFreight);

// vehicle
router.get("/list-vehicle", vehicleController.ListVehicle);
router.post("/add-vehicle",
    upload.fields([
        { name: "registration", maxCount: 1 },
        { name: "insurance", maxCount: 1 },
        { name: "fitness", maxCount: 1 },
        { name: "mv_tax", maxCount: 1 },
        { name: "puc", maxCount: 1 },
        { name: "ka_tax", maxCount: 1 },
        { name: "basic_and_KA_permit", maxCount: 1 },
    ]),
    vehicleController.AddVehicle
);
router.get("/download/:truckNo/:fieldName/:fileName",  vehicleController.DownloadFile);

// vendor
router.get("/list-vendor", vendorController.ListVendor);
router.post("/add-vendor", vendorController.AddVendor);

// transactions
router.post("/list-all-transactions", transactionsController.ListAllTransactions)

// billing
router.post("/list-billing", generateBillController.ListBill)
router.post("/generate-pdf-bill", generateBillController.GeneratePDFBill)

module.exports = router;

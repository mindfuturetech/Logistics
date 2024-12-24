const multer = require("multer");
const path= require('path');
// Setup storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const folderMap = {
            DieselSlipImage: path.join(__dirname, '..', 'uploadData', 'DieselSlipImage'),
            LoadingAdvice: path.join(__dirname, '..', 'uploadData', 'LoadingAdvice'),
            InvoiceCompany: path.join(__dirname, '..', 'uploadData', 'InvoiceCompany'),
            WeightmentSlip: path.join(__dirname, '..', 'uploadData', 'WeightmentSlip'),
          };

          const folder= folderMap[file.fieldname];

          if(folder){
            cb(null,folder);
          }else{
            new Error('Invalid field name or folder mapping');
          }
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Multer upload middleware
const upload = multer({ 
    storage: storage,
}).fields([
    { name: 'DieselSlipImage', maxCount: 1 },
    { name: 'LoadingAdvice', maxCount: 1 },
    { name: 'InvoiceCompany', maxCount: 1 },
    { name: 'WeightmentSlip', maxCount: 1 },
]);

module.exports = upload;
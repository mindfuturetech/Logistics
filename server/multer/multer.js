const multer = require("multer");

// Setup storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./upload"); // Directory to store the files
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now());
    }
});

// Multer upload middleware
const upload = multer({ 
    storage: storage,
}).fields([]);

module.exports = upload;

const multer = require("multer");
const path = require("path");
const crypto = require('crypto');

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder to store images
    },
    filename: function (req, file, cb) {

    // crypto.randomBytes(12, function(err, bytes){
    //         const fn = bytes.toString('hex') + path.extname(file.originalname)
    //         cb(null, fn)
    //     })

        
        // create unique filename: timestamp + original name
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName);
    }
});

// File filter (optional: only images)
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed"), false);
    }
};

const upload = multer({ storage, fileFilter });


module.exports = upload;
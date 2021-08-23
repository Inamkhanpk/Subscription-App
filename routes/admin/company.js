const express = require('express');
const router = express.Router();
const multer = require('multer');
const {registerCompany,getCompany} = require('./../../controller/admin/company')

const {auth,adminMiddleware} = require('./../../middleware/auth')
const path = require("path")

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {   
        cb(null,  Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

let upload = multer({ 
    storage, 
    fileFilter });


router.post('/registerCompany',auth,adminMiddleware,upload.single('thumbnail'),registerCompany);

router.get('/getcompany',auth,adminMiddleware,getCompany)



module.exports = router;
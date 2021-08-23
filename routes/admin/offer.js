const express = require('express');
const router = express.Router();
const multer = require('multer');
const {registerOffer,handlealloffer,getOffer} = require('./../../controller/admin/offer')
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


router.post('/registerOffer',auth,adminMiddleware,upload.single('thumbnail'),registerOffer);
router.get('/getoffer',auth,adminMiddleware,getOffer)
router.get('/handlealloffer',auth,adminMiddleware,handlealloffer)

module.exports = router;
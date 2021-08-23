const express = require('express');
const router = express.Router();
const {getCompany} = require('./../controller/company')
const {auth,userMiddleware} = require('./../middleware/auth')

router.get('/getcompany',auth,userMiddleware,getCompany)


module.exports = router;
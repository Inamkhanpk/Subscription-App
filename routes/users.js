const express = require('express');
const router = express.Router();


const {registration,verificationcode,signin,signout }=require('./../controller/users');


router.post("/register",registration);

router.post('/verify',verificationcode);

router.post("/login", signin);

router.get("/signout", signout);

module.exports = router;
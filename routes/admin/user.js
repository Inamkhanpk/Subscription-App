const express = require('express');
const router = express.Router();


const {registration,signin,signout}=require('./../../controller/admin/users');


router.post("/register",registration);

router.post("/login", signin);

router.get('/signout', signout)

module.exports = router;
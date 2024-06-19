const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const doctor = require("../controller/doctorController")


router.post("/submitdoctoravailability",jwt.checkJwt,doctor.submitDoctorAvailability)


module.exports=router
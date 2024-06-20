const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const doctor = require("../controller/doctorController")


router.post("/submitdoctoravailability",jwt.checkJwt,doctor.submitDoctorAvailability)
router.get("/getCurrentBookings",jwt.checkJwt,doctor.getCurrentBookings)
//this api will update the prescription towards the particular booking.
router.post("/addDetailsToPatient",jwt.checkJwt,doctor.addDetailsToPatient)


module.exports=router
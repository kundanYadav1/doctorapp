const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt')
const patient = require('../controller/patientController')


router.get('/getapproveddoctors',patient.getApprovedDoctors)
router.get('/getdoctoravailability',patient.getDoctorAvailablity)
router.get('/getalreadybookedslots',patient.getAlreadyBookedslots)
router.post('/submitbookings',jwt.checkJwt,patient.submitBookings)
//this api will get all the bookings that has been done by patient and it is restricted because we only want to send the details of booking of the calling request patient.
router.get('/getAllBookings',jwt.checkJwt,patient.getAllBookings)



module.exports=router;

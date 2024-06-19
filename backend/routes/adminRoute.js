const express = require('express');
const router = express.Router();
const jwt = require('../middleware/jwt');
const admin = require("../controller/adminController");


// Define routes with their corresponding handlers
router.get('/getApprovalRequestList', jwt.checkJwt, admin.getApprovalRequestList);
router.patch('/approvedoctor', jwt.checkJwt, admin.approveDoctor);
router.get('/getdoctordetails', jwt.checkJwt, admin.getDoctorDetails);
router.get('/getinventorydata', jwt.checkJwt, admin.getAllInventory)
router.patch('/updateinventory', jwt.checkJwt, admin.updateInventory)
router.post('/bulkinventory', jwt.checkJwt, admin.bulkInsertInventory)

module.exports = router;
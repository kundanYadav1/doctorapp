const express = require('express');
const router = express.Router();
const user = require('../controller/userController')
const jwt = require('../middleware/jwt')



router.post('/sendOtp', user.sendOtp)
router.post('/resendOtp', user.resendOtp)
router.post('/register', user.register)
router.post('/login', user.login)
router.get('/userdetail', jwt.checkJwt, user.userDetail)


module.exports = router;
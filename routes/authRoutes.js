const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');



//register page
router.get('/signup', authController.registerPage)

//register user
router.post('/register', authController.registerUser)

//verify email
router.get('/verify/:token', authController.verifyEmail)

//login
router.get('/login', authController.loginPage)

//log user in
router.post('/login', authController.logUserIn)

//logout
router.post('/logout', authController.userLogout)

//request pwd request page
router.get('/resetPassword', authController.requestPwdReset)

//request pwd request post
router.post('/requestPasswordReset', authController.requestPasswordReset)

//new pwd
router.get('/newPassword/:token', authController.newPassword)

//reset pwd
router.post('/reset-password/:token', authController.resetPassword)


module.exports = router;
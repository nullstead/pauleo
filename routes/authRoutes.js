const express = require('express');
// const session = require('express-session');
// const MongoDBStore = require('connect-mongodb-session')(session);
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


module.exports = router;
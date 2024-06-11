const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

//register
router.get('/signup', authController.registerPage)

//login
router.get('/login', authController.loginPage)

module.exports = router;
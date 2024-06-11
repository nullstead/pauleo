const User = require('../models/userModel');

//register page
const registerPage = (req, res) => {

    res.render('auth/signup', {title: 'Register'})
}

//login
const loginPage = (req, res) => {

    res.render('auth/login', {title: 'Log in'})
}


module.exports = {
    registerPage,
    loginPage
}
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//register page
const registerPage = (req, res) => {
    const sessionData = req.session
    const msg = req.query.msg;
    const msg2 = req.query.msg2;
    res.render('auth/signup', {title: 'Register', msg, msg2})
}

//register user
const registerUser = async (req, res) => {
    let {username, email, password } = req.body
    try {

        // console.log(req.body)

        const usernameExists = await User.findOne({username})
        const emailExists = await User.findOne({email})
        // console.log(userExists)
        if(usernameExists !== null && usernameExists ){
            const msg = 'Username is already taken!'
            res.redirect(`/auth/signup?msg=${encodeURIComponent(msg)}`)
            // console.log('User exists!')

        } else if(emailExists !== null && emailExists){
            const msg2 = 'Email is already registered!'
            res.redirect(`/auth/signup?msg2=${encodeURIComponent(msg2)}`)
            // console.log('Email exists!')

        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            password = hashedPassword
            
            const result = await User.insertMany({username, email, password})
            // console.log(result)
            req.flash('success', 'Registration successful!');
            res.redirect('/auth/login')
        }


        console.log(req.body)
        

    } catch(e) {
        res.status(500).send('Internal Server Error! :)')
        console.log(e)
    }
}


//login
const loginPage = (req, res) => {
    if(req.session.userId){
        res.redirect('/video')

    } else {
        const msg = req.query.msg;
        res.render('auth/login', {title: 'Log in', msg})
    }
    
}

//log user in
const logUserIn = async (req, res) => {
    let {credential, password} = req.body

    try {
        // console.log(req.body)
        if(credential.includes('@') && credential.includes('.')){
            const check = await User.findOne({email: credential})
            if(!check){
                const msg = 'Invalid Credentials'
                res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                // console.log('no user')
            } else {
                // console.log(check.role, check.password)
                const passwordVerify = await bcrypt.compare(password, check.password)
                if(!passwordVerify){
                    const msg = 'Invalid Credentials'
                    res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                    // console.log('wrong password')
                } else {
                    req.session.userId = check._id
                    req.session.username = check.username
                    req.session.email = check.email
                    req.session.role = check.role

                    if(check.role == 'user'){
                        req.flash('success', 'Login successful!');
                        res.redirect('/video')
                    } else if(check.role == 'admin'){
                        res.redirect('/manage-videos')
                    }

                }
            }

        } else {
            const check = await User.findOne({username: credential})
            if(!check){
                const msg = 'Invalid Credentials'
                res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                // console.log('no user')
            } else {
                // console.log(check.role, check.password)
                const passwordVerify = await bcrypt.compare(password, check.password)
                if(!passwordVerify){
                    const msg = 'Invalid Credentials'
                    res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                    // console.log('wrong password')
                } else {
                    req.session.userId = check._id
                    req.session.username = check.username
                    req.session.email = check.email
                    req.session.role = check.role

                    if(check.role == 'user'){
                        req.flash('success', 'Login successful!');
                        res.redirect('/video')
                    } else if(check.role == 'admin'){
                        req.flash('success', 'Login successful!');
                        res.redirect('/manage-videos')
                    }

                }
            }
            
        }

    } catch(e) {
        res.status(500).send('Internal Server Error! :)')
        console.log(e)
    }

    
   
}


//logout
const userLogout = (req, res) => {
    req.session.destroy(err => {
        if(err) {
            res.json({message: 'Could not log you out'})
        } else {
            res.json({message: 'Logout Successful!', redirect: '/auth/login'})
        }
    })
}

module.exports = {
    registerPage,
    registerUser,
    loginPage,
    logUserIn,
    userLogout
}
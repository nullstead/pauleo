const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Mawunayrawo';



//---NODE MAILER---
var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "b475e44b48767a",
      pass: "260b8e91f9eaf5"
    }
  });



//register page
const registerPage = (req, res) => {
    const sessionData = req.session
    const msg = req.query.msg;
    const msg2 = req.query.msg2;
    const emailMsg = req.query.emailMsg
    res.render('auth/signup', {title: 'Register', msg, msg2, emailMsg})
}


//email verification
function sendVerificationEmail(email, token) {
    const url = `http://localhost:3000/auth/verify/${token}`;
    
    transport.sendMail({
        to: email,
        subject: 'Verify your email address',
        html: `Click <a href="${url}">here</a> to verify your email address.`,
    });
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
            return;
            // console.log('User exists!')

        } else if(emailExists !== null && emailExists){
            const msg2 = 'Email is already registered!'
            res.redirect(`/auth/signup?msg2=${encodeURIComponent(msg2)}`)
            return;
            // console.log('Email exists!')

        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            password = hashedPassword
            
            const result = await User.insertMany({username, email, password})

            // Generate verification token
            const token = jwt.sign({ userId: result[0]._id }, JWT_SECRET, { expiresIn: '1d' });

            // Send verification email
            sendVerificationEmail(result[0].email, token)

            // console.log(result)
            const emailMsg = 'Registration successful! Check your email to verify your account.'
            return res.redirect(`/auth/signup?emailMsg=${encodeURIComponent(emailMsg)}`)
        }

        console.log(req.body)

    } catch(e) {
        res.status(500).send('Internal Server Error! :)')
        console.log(e)
        return;
    }
}


// Verification 
const verifyEmail =  async (req, res) => {
    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(400).send('Invalid token or user does not exist');
        }

        user.isVerified = true;
        await user.save();

        const emailMsg = 'Your email is verified! You can now Log In.'
        console.log('Email verified successfully');
        return res.redirect(`/auth/login?emailMsg=${encodeURIComponent(emailMsg)}`)

    } catch (error) {
        return res.status(400).send('Invalid token');
    }
}


//login
const loginPage = (req, res) => {
    if(req.session.userId){
        return res.redirect('/video')

    } else {
        const msg = req.query.msg
        const emailMsg = req.query.emailMsg
        const emailErrMsg = req.query.emailErrMsg
        return res.render('auth/login', {title: 'Log in', msg, emailMsg, emailErrMsg})
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
                const emailMsg = ''
                return res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                // console.log('no user')
            } 
            
            if (!check.isVerified) {
                const emailErrMsg = 'Your email is not verified!'
                console.log('Email not verified');
                return res.redirect(`/auth/login?emailErrMsg=${encodeURIComponent(emailErrMsg)}`)

            } 
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

        } else {
            const check = await User.findOne({username: credential})

                if(!check){
                    const msg = 'Invalid Credentials'
                    res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                    // console.log('no user')
                } 
                
                if (!check.isVerified) {
                    const emailErrMsg = 'Your email is not verified!'
                    console.log('Email not verified');
                    return res.redirect(`/auth/login?emailErrMsg=${encodeURIComponent(emailErrMsg)}`)

                } else {
                    // console.log(check.role, check.password)
                    const passwordVerify = await bcrypt.compare(password, check.password)

                    if(!passwordVerify){
                        const msg = 'Invalid Credentials'
                        res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                        // console.log('wrong password')
                    } 

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
    verifyEmail,
    loginPage,
    logUserIn,
    userLogout
}
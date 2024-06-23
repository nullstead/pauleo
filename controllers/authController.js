const User = require('../models/userModel');
const Video = require('../models/videoModel');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');


//---JWT---
const JWT_SECRET = process.env.JWT_SECRET;



//---NODE MAILER---
// var transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.MAILTRAP_USER,
//       pass: process.env.MAILTRAP_PASS
//     }
//   });


  var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS
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
function sendVerificationEmail(email, token, req) {
    const rootUrl = `${req.protocol}://${req.get('host')}`
    const authUrl = `/auth/verify/${token}`
    const url = rootUrl+authUrl
    
    transport.sendMail({
        to: email,
        subject: 'pauLeo - Verify your email address',
        html: `<h3>Please click <a href="${url}">here</a> to verify your email address to complete your registration.</h3>`,
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
            sendVerificationEmail(result[0].email, token, req)

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
                return res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                // console.log('no user')s

            } else if (!check.isVerified) {
                const emailErrMsg = 'Your email is not verified!'
                console.log('Email not verified');
                return res.redirect(`/auth/login?emailErrMsg=${encodeURIComponent(emailErrMsg)}`)

            } 
                // console.log(check.role, check.password)
                const passwordVerify = await bcrypt.compare(password, check.password)
                if(!passwordVerify){
                    const msg = 'Invalid Credentials'
                    return res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                    // console.log('wrong password')
                } else {

                    req.session.userId = check._id
                    req.session.username = check.username
                    req.session.email = check.email
                    req.session.role = check.role

                    if(check.role == 'user'){
                        //checking if any video has been uploaded before rendering the paginated page
                        const video = await Video.findOne().sort({ _id: 1 }).exec()

                        if (video) {
                            req.flash('success', 'Login successful!');
                            console.log('At least a video exists!');
                            return res.redirect('/videos/'+video._id)
                            
                        } else {
                            req.flash('error', 'Sorry... There are no videos to view at the moment!');
                            console.log('No videos found.');
                            return res.redirect('404')
                        }

                        
                    } else if(check.role == 'admin'){
                        return res.redirect('/manage-videos')
                    }

                }

        } else {
            const check = await User.findOne({username: credential})

                if(!check){
                    const msg = 'Invalid Credentials'
                    res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                    // console.log('no user')

                }else if (!check.isVerified) {
                    const emailErrMsg = 'Your email is not verified!'
                    console.log('Email not verified');
                    return res.redirect(`/auth/login?emailErrMsg=${encodeURIComponent(emailErrMsg)}`)

                } else {
                    // console.log(check.role, check.password)
                    const passwordVerify = await bcrypt.compare(password, check.password)

                    if(!passwordVerify){
                        const msg = 'Invalid Credentials'
                        return res.redirect(`/auth/login?msg=${encodeURIComponent(msg)}`)
                        // console.log('wrong password')
                    } 

                    req.session.userId = check._id
                    req.session.username = check.username
                    req.session.email = check.email
                    req.session.role = check.role

                    if(check.role == 'user'){
                         //checking if any video has been uploaded before rendering the paginated page
                         const video = await Video.findOne().sort({ _id: 1 }).exec()

                         if (video) {
                             req.flash('success', 'Login successful!');
                             console.log('At least a video exists!');
                             return res.redirect('/videos/'+video._id)
                             
                         } else {
                             req.flash('error', 'Sorry... There are no videos to view at the moment!');
                             console.log('No videos found.');
                             return res.redirect('404')
                         }

                    } else if(check.role == 'admin'){
                        req.flash('success', 'Login successful!');
                        return res.redirect('/manage-videos')
                    }

                }
            
        }

    } catch(e) {
        console.log(e)
        return res.status(500).send('Internal Server Error! :)')
        
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



 //password reset email
 function sendPasswordResetEmail(user, token, req) {
    const rootUrl = `${req.protocol}://${req.get('host')}`
    const authUrl = `/auth/newPassword/${token}`;
    const url = rootUrl+authUrl
    
    transport.sendMail({
        to: user.email,
        subject: 'Password Reset',
        html: `<h3>Please click <a href="${url}">here</a> to reset your password.`,
    });
}



 // Request password reset get
 const requestPwdReset = (async (req, res) => {
    return res.render('auth/pwd-reset', {title: 'Request Password Reset'})
})

// Request password reset 
const requestPasswordReset = (async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).send('Invalid email: not registered');
        }

        // Generate reset token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
        // Save token and expiration to user
        user.passwordResetToken = token;
        user.passwordResetExpires = Date.now() + 3600000; // 1 hour
        await user.save();

        // Send reset email
        sendPasswordResetEmail(user, token, req);
        // console.log('Password reset email sent')
        res.send('Password reset email sent! Check your inbox to access the reset link.');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Password reset  get - new password
const newPassword = (async (req, res) => {
    const { token } = req.params;

    return res.render('auth/new-pwd', {title: 'Reset Password', token})
})

// Password reset  post
const resetPassword = (async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    // console.log(token, password)

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findOne({
            _id: decoded.userId,
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }

        // Update password
        user.password = await bcrypt.hash(password, 10);
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        console.log('Password reset successful')
        emailMsg = 'Password reset successful! Log In with your new password.'
        res.redirect(`/auth/login/?emailMsg=${encodeURIComponent(emailMsg)}`);
    } catch (error) {
        res.status(400).send('Invalid token');
    }
});




module.exports = {
    registerPage,
    registerUser,
    verifyEmail,
    loginPage,
    logUserIn,
    userLogout,
    requestPwdReset,
    requestPasswordReset,
    newPassword,
    resetPassword
}
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

//register page
const registerPage = (req, res) => {
    const sessionData = req.session
    res.render('auth/signup', {title: 'Register', sessionData})
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
            res.status(401).send('Username is already taken!')
            // console.log('User exists!')

        } else if(emailExists !== null && emailExists){
            res.status(401).send('This email is already registered!')
            // console.log('Email exists!')

        } else {
            const hashedPassword = await bcrypt.hash(password, 10)
            password = hashedPassword
            
            const result = await User.insertMany({username, email, password})
            // console.log(result)
            
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
        res.render('auth/login', {title: 'Log in'})
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
                res.status(401).send('Invalid Credentials')
                // console.log('no user')
            } else {
                // console.log(check.role, check.password)
                const passwordVerify = await bcrypt.compare(password, check.password)
                if(!passwordVerify){
                    res.status(401).send('Invalid Credentials')
                    // console.log('wrong password')
                } else {
                    req.session.userId = check._id
                    req.session.username = check.username
                    req.session.email = check.email
                    req.session.role = check.role

                    if(check.role == 'user'){
                        res.redirect('/video')
                    } else if(check.role == 'admin'){
                        res.redirect('/manage-videos')
                    }

                }
            }

        } else {
            const check = await User.findOne({username: credential})
            if(!check){
                res.status(401).send('Invalid Credentials')
                // console.log('no user')
            } else {
                // console.log(check.role, check.password)
                const passwordVerify = await bcrypt.compare(password, check.password)
                if(!passwordVerify){
                    res.status(401).send('Invalid Credentials')
                    // console.log('wrong password')
                } else {
                    req.session.userId = check._id
                    req.session.username = check.username
                    req.session.email = check.email
                    req.session.role = check.role

                    if(check.role == 'user'){
                        res.redirect('/video')
                    } else if(check.role == 'admin'){
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
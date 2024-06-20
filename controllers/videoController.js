const Video = require('../models/videoModel');

//video page
const videoPage = (req, res) => {
    if(req.session.role == 'user'){
        const sessionData = req.session
        return res.render('videos/video', {title: 'Video', sessionData})

    } 
    // else {
    //     const msg = "" //login page msg fix
    //     const emailMsg = "" //login page msg fix
    //     const emailErrMsg = "" //login page msg fix
    //     return res.render('auth/login', {title: 'Log in', msg, emailMsg, emailErrMsg})
    // }
    
}


//video upload page
const videoUploadPage = (req, res) => {
    if(req.session.role == 'admin'){
        return res.render('admin/upload-videos', {title: 'Admin - Upload Videos'})

    } else {
        const msg = "" //login page msg fix
        return res.render('auth/login', {title: 'Log in', msg})
    }
    
}


//video management page
const manageVideosPage = (req, res) => {
    if(req.session.role == 'admin'){
        return res.render('admin/manage-videos', {title: 'Admin - Manage Videos', sessionData: req.session})

    } else {
        const msg = "" //login page msg fix
        return res.render('auth/login', {title: 'Log in', msg})
    }
    
}



module.exports = {
    videoPage,
    videoUploadPage,
    manageVideosPage
}
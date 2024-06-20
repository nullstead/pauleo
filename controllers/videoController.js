const Video = require('../models/videoModel');

//video page
const videoPage = (req, res) => {
    // if(req.session.role == 'user'){
        const sessionData = req.session
        return res.render('videos/video', {title: 'Video', sessionData})

    // } 

    // res.status(404).send('[Users Page] You are authorized to access this page!')

    // else {
    //     const msg = "" //login page msg fix
    //     const emailMsg = "" //login page msg fix
    //     const emailErrMsg = "" //login page msg fix
    //     return res.render('auth/login', {title: 'Log in', msg, emailMsg, emailErrMsg})
    // }
    
}


//video upload page
const videoUploadPage = (req, res) => {
    // if(req.session.role == 'admin'){
        const sessionData = req.session
        return res.render('admin/upload-videos', {title: 'Admin - Upload Videos', sessionData})

    // } 

    // res.status(404).send('[Admins Page] You are not authorized to access this page!')
    
}


//video management page
const manageVideosPage = (req, res) => {
    // if(req.session.role == 'admin'){
        const sessionData = req.session
        return res.render('admin/manage-videos', {title: 'Admin - Manage Videos', sessionData})

    // }
    
    // res.status(404).send('[Admins Page] You are not authorized to access this page!')
    
}



module.exports = {
    videoPage,
    videoUploadPage,
    manageVideosPage
}
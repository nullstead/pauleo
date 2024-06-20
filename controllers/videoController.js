const Video = require('../models/videoModel');

//video page
const videoPage = (req, res) => {
    if(req.session.role == 'user'){
        const sessionData = req.session
        res.render('videos/video', {title: 'Video', sessionData})

    } else {
        res.render('auth/login', {title: 'Log in'})
    }
    
}


//video upload page
const videoUploadPage = (req, res) => {
    if(req.session.role == 'admin'){
        res.render('admin/upload-videos', {title: 'Admin - Upload Videos'})

    } else {
        res.render('auth/login', {title: 'Log in'})
    }
    
}


//video management page
const manageVideosPage = (req, res) => {
    if(req.session.role == 'admin'){
        res.render('admin/manage-videos', {title: 'Admin - Manage Videos', sessionData: req.session})

    } else {
        res.render('auth/login', {title: 'Log in'})
    }
    
}



module.exports = {
    videoPage,
    videoUploadPage,
    manageVideosPage
}
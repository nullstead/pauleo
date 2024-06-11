const Video = require('../models/videoModel');

//video page
const videoPage = (req, res) => {

    res.render('videos/video', {title: 'Video'})
}


//video upload page
const videoUploadPage = (req, res) => {

    res.render('admin/upload-videos', {title: 'Admin - Upload Videos'})
}


//video management page
const manageVideosPage = (req, res) => {
    res.render('admin/manage-videos', {title: 'Admin - Manage Videos'})
}



module.exports = {
    videoPage,
    videoUploadPage,
    manageVideosPage
}
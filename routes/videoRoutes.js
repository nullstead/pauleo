const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController');

//video page
router.get('/video', videoController.videoPage)

//admin upload videos page
router.get('/upload-videos', videoController.videoUploadPage)

//admin manage videos page
router.get('/manage-videos', videoController.manageVideosPage)


module.exports = router
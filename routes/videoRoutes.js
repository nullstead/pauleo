const express = require('express');
const router = express.Router();

const videoController = require('../controllers/videoController');
const upload = require('../middlewares/uploadMiddleware');

//video page
router.get('/video/:id', videoController.videoPage)

//paginated videos
// router.get('/videos', videoController.paginatedVideos)
router.get('/videos/:id', videoController.paginatedVideos)

//admin upload videos page
router.get('/upload-videos', videoController.videoUploadPage)

//admin upload videos - post
router.post('/upload', upload.single('file'), videoController.videoUpload)

//admin delete a video
router.post('/videos/delete/:id', videoController.deleteVideo) 

//admin manage videos page
router.get('/manage-videos', videoController.manageVideosPage)




module.exports = router
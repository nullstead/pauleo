const Video = require('../models/videoModel');
const aws = require('aws-sdk');

// AWS S3 configuration
const s3 = new aws.S3({
    accessKeyId: 'AKIAU6GDW4LIES2J3A4Z',
    secretAccessKey: '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',
    region: 'us-east-1',
  });


//  Upload a video to S3 and metadata to MongoDB
const videoUpload = async (req, res) => {
    const { title, description } = req.body;

    // console.log(req.file, req.body)
    const video = new Video({
      title,
      description,
      url: req.file.location,
      s3_key: req.file.key,
    });
  
    try {
      await video.save();
      console.log('Video uploaded')
      req.flash('success', 'Video uploaded successfully!')
      res.redirect('/manage-videos')
    } catch (err) {
      console.log('Error uploading video')
      req.flash('error', 'Error uploading video to S3')
      res.redirect('/manage-videos')
    //   res.status(500).json({ error: 'Error saving video metadata' });
    }

  };



//Delete a video by ID
const deleteVideo =  async (req, res) => {
    try {
      const video = await Video.findById(req.params.id);
      if (!video) {
        console.log('Video not found')
        return res.status(404).json({ error: 'Video not found' });
      }
  
      const params = {
        Bucket: 'pauleo/videos',
        Key: video.s3_key,
      };
  
      s3.deleteObject(params, async (err, data) => {
        if (err) {
          console.log('Error deleting video from S3 Bucket')
          req.flash('error', 'Error deleting video from S3');
          return res.redirect('/manage-videos');
        //   return res.status(500).json({ error: 'Error deleting video from S3' });
        }
  
        await video.deleteOne();
        console.log('Video deleted!')
        req.flash('success', 'Video successfully deleted!');
        res.redirect('/manage-videos');
      });
    } catch (err) {
        console.log(err)
      res.status(500).json({ error: 'Error deleting video - e' });
    }
  };




//video page
const videoPage = async (req, res) => {

    const sessionData = req.session

    try {
        const video = await Video.findById(req.params.id);
        console.log('video retrieved')
        return res.render('videos/video', {video, sessionData})

      } catch (err) {
        res.status(500).json({ error: 'Error fetching the video' });
      }
       
    
}



// getting all videos with pagination
// const paginatedVideos =  async (req, res) => {
//     const perPage = 5;
//     const page = parseInt(req.query.page) || 1;
  
//     try {
//       const videos = await Video.find()
//         .skip((perPage * page) - perPage)
//         .limit(perPage);
  
//       const count = await Video.countDocuments();
  
//       res.render('videos/videos', {
//         videos,
//         current: page,
//         pages: Math.ceil(count / perPage),
//         title: 'Video List'
//       });
//     } catch (err) {
//       res.status(500).json({ error: 'Error fetching videos' });
//     }
//   };


// getting videos with pagination

  const paginatedVideos = async (req, res) => {

    try {
        const video = await Video.findById(req.params.id);
    
        if (!video) {
          return res.status(404).send('Video not found');
        }
    
        const allVideos = await Video.find();
        const currentIndex = allVideos.findIndex(v => v._id.toString() === video._id.toString());
    
        const previousVideo = currentIndex > 0 ? allVideos[currentIndex - 1] : null;
        const nextVideo = currentIndex < allVideos.length - 1 ? allVideos[currentIndex + 1] : null;
    
        res.render('videos/videos', { video, previousVideo, nextVideo, title: 'Video List' });

      } catch (err) {
        res.status(500).json({ error: 'Error fetching video' });
        
      }

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
const manageVideosPage = async (req, res) => {
    // if(req.session.role == 'admin'){
        const sessionData = req.session

        try {
            const videos = await Video.find().sort({ createdAt: 1 });
            return res.render('admin/manage-videos', {title: 'Admin - Manage Videos', sessionData, videos})
    
          } catch (err) {
            res.status(500).json({ error: 'Error fetching videos' });
          }     

    // }
    
    // res.status(404).send('[Admins Page] You are not authorized to access this page!')
    
}



module.exports = {
    videoPage,
    paginatedVideos,
    videoUploadPage,
    manageVideosPage,
    videoUpload,
    deleteVideo
}
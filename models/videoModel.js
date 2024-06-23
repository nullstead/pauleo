const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema(
    { 
        title: String,
        description: String,
        url: String,
        s3_key: String,
        uploadedAt: { type: Date, default: Date.now }

    },

)

const Video = new mongoose.model('Video', videoSchema)

module.exports = Video
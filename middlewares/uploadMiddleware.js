const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const path = require('path');





// AWS S3 configuration
const s3 = new aws.S3({
    accessKeyId: 'AKIAU6GDW4LIES2J3A4Z',
    secretAccessKey: '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',
    region: 'us-east-1',
  });



// Multer S3 configuration
const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'pauleo/videos',
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname);
      },
    }),
  });

module.exports = upload
'use strict';
var request = require('request');
const { response } = require('express');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');
var multer = require('multer');

AWS.config.update({
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
    region: 'us-east-1',
});


exports.convert = function (req, res) {
    
    console.log("Convert Start----------------------------------------------");	
    
    // Data from the req and put it in an array accessible to the main app.

    // console.log(req);
    const upload = multer({
        storage: multerS3({
          s3: new AWS.S3(),
          bucket: 'lVNhRBjK35lN9SFrwl7adSHAI78etWOQXy+w81Fl',
          key(req, file, cb) {
            cb(null, 'APPS/TEST/MMSTW/${Date.now()}_${path.basename(file.originalname)}');
    
          },
        }),
        limits: { fileSize: 20 * 1024 * 1024 },
      });
    res.send(200, 'Convert');
};
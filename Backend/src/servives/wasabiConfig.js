// const AWS = require('aws-sdk');
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
dotenv.config();


const s3 = new AWS.S3({
  endpoint: process.env.WASABI_S3_ENDPOINT, // Wasabi's S3 endpoint
  accessKeyId:process.env.WASABI_S3_ACCESS_ID,  // Store in .env file
  secretAccessKey: process.env.WASABI_S3_SECRET_KEY,
  region: process.env.WASABI_S3_REGION, // Change to your Wasabi region
});

// module.exports = s3;
export default s3;
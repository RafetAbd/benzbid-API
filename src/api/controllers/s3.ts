import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

const region = "us-west-2"
const bucketName = "benzbid-cars-images"
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

const s3 = new AWS.S3({
    region: region,
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    signatureVersion: 'v4'
});

export const generateUploadURL = async() => {
    const imageName = Date.now().toString();

    const params = ({
        Bucket: bucketName,
        Key: imageName,
        Expires: 60,
    });
    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    return uploadUrl;
}
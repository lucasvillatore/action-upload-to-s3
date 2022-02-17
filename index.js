const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const aws = require('aws-sdk')

function getAWSConfiguration() {

    return {
        'accessKey': core.getInput('aws-access-key'),
        'secretKey': core.getInput('aws-secret-key'),
        'bucketS3': core.getInput('bucket-s3'),
        'region': core.getInput('region'),
        'path': core.getInput('path'),
    }
}

const uploadFile = (bucket, filename) => {
    fs.readFile(filename, (err, data) => {
        if (err) {
            throw err;
        }
        const params = {
            Bucket: bucket,
            Key: filename,
            Body: JSON.stringify(data, null, 2)
        };

        s3.upload(params, function (s3Err, data) {
            if (s3Err) {
                throw s3Err
            }
            console.log(`File uploaded successfully at ${data.Location}`)
        });
    });
};
const configuration = getAWSConfiguration()
const file = 'index.js';

console.log('upload to s3');
const s3 = new aws.S3({
    accessKey: configuration.accessKey,
    secretKey: configuration.secretKey,
    region: configuration.region
});

uploadFile(configuration.bucketS3, file);
const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const aws = require('aws-sdk')



function getAWSConfiguration() {

    return {
        'accessKey': 'AKIAZZHBJ2OC64CPEZ6K', //core.getInput('aws-access-key'),
        'secretKey': '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', //core.getInput('aws-secret-key'),
        'bucketS3': 'lucas-block-bucket-teste',//core.getInput('bucket-s3'),
        'region': 'us-east-1',//core.getInput('region'),
        'path': '',//core.getInput('path'),
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
            Body: JSON.stringify(data, null, 2),
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
const file = 'project.zip';

const credentials = new aws.Credentials({
    "accessKeyId": configuration.accessKey ,
    "secretAccessKey": configuration.secretKey
})

aws.config.credentials = credentials;
const s3 = new aws.S3({
    region: configuration.region
});

console.log(github.context);
// uploadFile(configuration.bucketS3, file);
const aws = require('aws-sdk');

// Replace with your region endpoint, nyc1.digitaloceanspaces.com for example
const spacesEndpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
// Replace with your bucket name
const bucketName = 'your_bucket_name';

const s3 = new aws.S3({endpoint: spacesEndpoint,
accessKeyId: 'your_access_key',
secretAccessKey: 'your_secret_key'

});
s3.putBucketLifecycleConfiguration({
    Bucket: bucketName,
    LifecycleConfiguration: {
        Rules: [{
            ID: "autodelete_rule",
            Expiration: {Days: 7},
            Status: "Enabled",
            Prefix: '/', // Unlike AWS in DO this parameter is required
        }]
    }
}, function (error, data) {
    if (error) 
        console.error(error);
    else
        console.log("Successfully modified bucket lifecycle!");
});

const aws = require('aws-sdk');

const s3 = new aws.S3();


/**
 * Returns a presigned url to be used in the specified bucket. The name of the
 * object uploaded is the same as the parameter key received. By default the
 * url will expires in 60 seconds.
 * 
 * @param string body received from API Gateway
 * @returns a JSON object that contains the url
 */
function handler({ body }) {
    const { bucket, key } = JSON.loads(body);
    const params = {
        Bucket: bucket,
        Key: key,
        Expires: 60
    }
    const presignedUrl = s3.getSignedUrl('putObject', params);

    return {
        body: JSON.stringify({
            url: presignedUrl
        }),
        statusCode: 200
    }
}

module.exports.lambdaHandler = handler;
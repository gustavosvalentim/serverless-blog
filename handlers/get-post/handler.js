const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB();

/**
 * Returns all posts or just one if specified in path parameters.
 * 
 * @param object pathParams path parameters received in the request. If
 * pathParams is undefined or null, then all tasks will be returned.
 * @returns key value pairs from the item found or an array of items.
 */
async function handler({ pathParams }) {
    if(pathParams) {
        const getItemParams = {
            TableName: process.env.posts_table,
            Key={
                id: {
                    S: pathParams.id
                }
            }
        }

        try {
            const data = await dynamodb.getItem(getItemParams).promise();
        } catch(e) {
            return {
                statusCode: 500
            }
        }
    }

    return {
        body: JSON.stringify(data),
        statusCode: 200
    }
}

lambda.exports.lambdaHandler = handler;
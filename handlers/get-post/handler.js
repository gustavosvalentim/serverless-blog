const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB();

/**
 * Returns all posts or just one if specified in path parameters.
 * 
 * @param object pathParameters path parameters received in the request. If
 * pathParameters is undefined or null, then all tasks will be returned.
 * @returns key value pairs from the item found or an array of items.
 */
async function handler({ pathParameters }) {
    // Parameters used in DynamoDB operations
    const params = {
        TableName: process.env.posts_table
    }

    // Data present in response
    let data;

    try {

        /** 
         * Use getItem operation if pathParameter is present on request
         * scan operation if pathParemeters is null
         */
        switch(typeof pathParameters) {
            case 'string':
                data = await dynamodb.getItem(params).promise();
                break;
            default:
                data = await dynamodb.scan(params).promise();
                break;
        }
    } catch(e) {
        return {
            body: JSON.stringify({
                message: e.message
            }),
            statusCode: 500
        }
    }

    return {
        body: JSON.stringify({
            item: data
        }),
        statusCode: 200
    }
}

module.exports.lambdaHandler = handler;
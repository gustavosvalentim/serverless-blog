const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB.DocumentClient();

/**
 * Deletes blog post that contains the ID passed in path parameters.
 * 
 * @param object pathParameters is the path parameters got from API Gateway when a
 * request is received.
 * @returns success message and the id of the item deleted or error message.
 */
async function handler({ pathParameters }) {
    // Parameters used in DynamoDB operations
    const params = {
        TableName: process.env.posts_table,
        Key: {
            id: pathParameters.id
        }
    }

    try {
        await dynamodb.delete(params).promise();
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
            message: 'Success',
            item: {
                id: pathParameters.id
            }
        }),
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

module.exports.lambdaHandler = handler;
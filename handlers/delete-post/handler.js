const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB();

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
        Key={
            id: {
                S: pathParameters.id
            }
        }
    }

    try {
        await dynamodb.deleteItem(params).promise();
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
                id: id
            }
        }),
        statusCode: 200
    }
}

module.exports.lambdaHandler = handler;
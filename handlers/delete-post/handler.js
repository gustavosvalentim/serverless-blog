const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB();

/**
 * Deletes blog post that contains the ID passed in path parameters.
 * 
 * @param object pathParams is the path parameters got from API Gateway when a
 * request is received.
 * @returns success message and the id of the item deleted or the error message.
 */
async function handler({ pathParams }) {
    try {
        const deleteItemParams = {
            TableName: process.env.posts_table,
            Key={
                id: {
                    S: pathParams.id
                }
            }
        }
        await dynamodb.deleteItem(deleteItemParams).promise();
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
                id: pathParams.id
            }
        }),
        statusCode: 200
    }
}

module.exports.lambdaHandler = handler;
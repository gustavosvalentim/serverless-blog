const uuid = require('uuid');
const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB();

/**
 * Create a new post in DynamoDB.
 * 
 * @param string body is the post data. An `id` is added to the item, this id
 * is the primary key for DynamoDB.
 * @returns object saying if the operation was a success, otherwise it will
 * return the error message.
 */
async function handler({ body }) {
    const parseBody = JSON.parse(body);
    parseBody.id = uuid.v4().toString();

    try {
        const putItemParams = {
            TableName: process.env.posts_table,
            Item: parseBody
        }
        await dynamodb.putItem(putItemParams).promise();
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
            item: parseBody
        }),
        statusCode: 200
    }
}

module.exports.lambdaHandler = handler;
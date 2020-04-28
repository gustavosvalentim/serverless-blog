const uuid = require('uuid');
const aws = require('aws-sdk');

const dynamodb = new aws.DynamoDB.DocumentClient();

/**
 * Create a new post in DynamoDB.
 * 
 * @param string body is the post data. An `id` is added to the item, this id
 * is the primary key for DynamoDB. Other attributes are also added to improve
 * filters.
 * @returns object saying if the operation was a success, otherwise it will
 * return the error message.
 */
async function handler({ body }) {
    const parseBody = JSON.parse(body);

    if(!parseBody) return {
        body: JSON.stringify({
            message: 'Body must contain at least title'
        }),
        statusCode: 400
    }

    const createdAt = new Date().getTime();
    const itemAutoProps = {
        id: uuid.v4().toString(),
        created_at: createdAt,
        updated_at: createdAt,
        upvotes: [],
        downvotes: [],
        views: []
    }
    const item = { ...parseBody, ...itemAutoProps }

    const params = {
        TableName: process.env.posts_table,
        Item: item
    }

    try {
        await dynamodb.put(params).promise();
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
            item: itemAutoProps
        }),
        statusCode: 200
    }
}

module.exports.lambdaHandler = handler;
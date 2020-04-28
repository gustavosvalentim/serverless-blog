const aws = require('aws-sdk');

const documentClient = new aws.DynamoDB.DocumentClient();

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
        if(pathParameters && pathParameters.id) {
            params.Key = { id: pathParameters.id }

            const item = await documentClient.get(params).promise();
            data = item.Item;
        } else {
            const items = await documentClient.scan(params).promise();
            data = items.Items;
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
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    }
}

module.exports.lambdaHandler = handler;
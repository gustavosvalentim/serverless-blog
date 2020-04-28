const handler = require('./handler');

jest.mock('aws-sdk', () => {
    return {
        DynamoDB: {
            DocumentClient: jest.fn(() => ({
                put: jest.fn().mockReturnThis(),
                promise: jest.fn()
            }))
        }
    }
});

describe('Test create post handler', () => {
    it('should return statusCode 200', async () => {
        expect(await handler.lambdaHandler({
            body: JSON.stringify({ title: 'test' })
        })).toHaveProperty('statusCode', 200);
    });

    it('should return statusCode 400', async () => {
        expect(await handler.lambdaHandler({
            body: null
        })).toHaveProperty('statusCode', 400);
    });
});
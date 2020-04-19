const handler = require('./handler');

jest.mock('aws-sdk', () => {
    return {
        DynamoDB: jest.fn(() => ({
            putItem: jest.fn().mockReturnThis(),
            promise: jest.fn()
        }))
    }
});

describe('...', () => {
    it('should return statusCode 200', async () => {
        expect(await handler.lambdaHandler({
            body: JSON.stringify({ title: 'test' })
        })).toHaveProperty('statusCode', 200);
    });
});
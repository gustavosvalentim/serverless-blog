const handler = require('./handler');

jest.mock('aws-sdk', () => ({
    DynamoDB: {
        DocumentClient: jest.fn(() => ({
            delete: jest.fn().mockReturnThis(),
            promise: jest.fn()
        }))
    }
}));

describe('test delete post', () => {
    it('should return status 200', async () => {
        expect(await handler.lambdaHandler({
            pathParameters: {
                id: 123
            }
        })).toHaveProperty('statusCode', 200);
    });
});
const handler = require('./handler');

jest.mock('aws-sdk', () => ({
    DynamoDB: jest.fn(() => ({
        getItem: jest.fn().mockReturnThis(),
        scan: jest.fn().mockReturnThis(),
        promise: jest.fn()
    }))
}));

describe('test get post handler', () => {
    it('should return 200', async () => {
        expect(await handler.lambdaHandler({
            pathParameters: null
        })).toHaveProperty('statusCode', 200);
    });
});
const AWS = require('aws-sdk');

const getTask =  async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } =  event.pathParameters;
    
        const result = await dynamodb.get({
            TableName: 'TaskTable',
            Key: {
                id
            }
        }).promise();
        const item = result.Item;
        console.log(item);
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(item),
        }
        return response;
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: JSON.stringify('An  error has occured')
        }
    }
}

module.exports = {
    getTask,
}
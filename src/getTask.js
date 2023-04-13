const AWS = require('aws-sdk');

const getTask =  async (event) => {
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
}

module.exports = {
    getTask,
}
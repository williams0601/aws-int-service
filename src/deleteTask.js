const AWS = require('aws-sdk');

const deleteTask = async (event) => {
    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const { id } = event.pathParameters;

    const res = await dynamodb.delete({
        TableName: 'TaskTable',
        Key: {id},
        ReturnValues: 'ALL_OLD',
    }).promise();
    console.log(res);

    const response = {
        status: 200,
        body: JSON.stringify(res)
    }
    return response;
}

module.exports = {
    deleteTask,
}
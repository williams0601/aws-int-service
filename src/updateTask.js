const AWS = require('aws-sdk');

const updateTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const {id} = event.pathParameters;
        const {done} = JSON.parse(event.body);
    
        const result = await dynamodb.update({
            TableName: 'TaskTable',
            Key: {id},
            UpdateExpression: 'set done = :doneValue',
            ExpressionAttributeValues: {
                ':doneValue': done,
            },
            ReturnValues:  'ALL_NEW',
        }).promise();
        console.log(result);
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(result),
        }
        return response;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    updateTask,
}
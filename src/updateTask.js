const AWS = require('aws-sdk');

const updateTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const {id} = event.pathParameters;
        const {title, description,done} = JSON.parse(event.body);
    
        const result = await dynamodb.update({
            TableName: 'TaskTable',
            Key: {id},
            UpdateExpression: 'set done = :doneValue,  title = :titleValue, description = :descriptionValue',
            ExpressionAttributeValues: {
                ':doneValue': done,
                ':titleValue': title,
                ':descriptionValue': description,
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
        return {
            statusCode: 500,
            body: JSON.stringify('An  error has occured')
        }
    }
}

module.exports = {
    updateTask,
}
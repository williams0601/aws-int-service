const AWS = require('aws-sdk');

const deleteTask = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const { id } = event.pathParameters;
    
        const res = await dynamodb.delete({
            TableName: 'TaskTable',
            Key: {id},
            ReturnValues: 'ALL_OLD',
        }).promise();
        console.log(res);
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(res)
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
    deleteTask,
}
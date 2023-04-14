const AWS = require('aws-sdk');

const getTasks = async (event) => {
    try {
        const dynamodb = new AWS.DynamoDB.DocumentClient();
        const result = await dynamodb.scan({
            TableName: 'TaskTable'
        }).promise();
        
        const tasks = result.Items;
        console.log(result.Items);
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(tasks)
            //body: {tasks}
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
    getTasks,
}

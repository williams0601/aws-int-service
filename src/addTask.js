const{v4} = require('uuid')
const AWS = require('aws-sdk');

const addTask = async(event) =>{
    try {
        const dynamoDb = new AWS.DynamoDB.DocumentClient();
        const {title, description } = JSON.parse(event.body);
        const createdAt = Date()
        const id = v4()
    
        const newTask = {
            title,
            description,
            createdAt,
            id,
            done: false
        }
        console.log(newTask);
    
        await dynamoDb.put({
            TableName: 'TaskTable',
            Item: newTask
        }).promise()
    
        const response = {
            statusCode: 200,
            body: JSON.stringify(newTask)
        }
        return response;
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addTask,
}
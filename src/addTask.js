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
            id
        }
        console.log(newTask);
    
        await dynamoDb.put({
            TableName: 'TaskTable',
            Item: newTask
        }).promise()
    
        return{
            status: 200,
            body: JSON.stringify(newTask)
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    addTask,
}
const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

module.exports = {
    async scanAll(table_name, p={}) {
        p = { 
            TableName: table_name,
            Limit: 10000,
            ...p
        }

        let data = await ddb.scan(p).promise()
        let scannedItems = data.Items
        while( typeof data.LastEvaluatedKey !== "undefined" ) {
            p.ExclusiveStartKey  = data.LastEvaluatedKey
            data = await ddb.scan(p).promise()
            scannedItems = [ ...scannedItems, ... data.Items]
        }

        return scannedItems
    },

    async deleteAll(table_name) {        
        let p = { RequestItems:{} }

        let items = await this.scanAll(table_name)

        if(items.length <= 0) {
            return
        }

        return await Promise.all(items.map(async (i) => {
            return await ddb.delete({
                TableName: table_name,
                Key: {
                    'id': String(i.id)
                }
            }).promise()
        }))
    },

    async batchWrite(table_name, items) {
        return await Promise.all(items.map(async (i) => {
            i.id = String(i.id) //Need id to be a string type

            return await ddb.put({
                TableName: table_name,
                Item: i
            }).promise()
        }))
    }
}
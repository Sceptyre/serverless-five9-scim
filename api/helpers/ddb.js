const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()

module.exports = {
    async scanAll(table_name) {
        let p = { TableName: table_name }

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
        p.RequestItems[table_name] = items.map(
            i => {
                return {
                    DeleteRequest: {
                        Key: i.id
                    }
                }
            }
        )

        return await ddb.batchWrite(p).promise()
    },

    async batchWrite(table_name, items) {
        let p = { RequestItems:{} }

        p.RequestItems[table_name] = items.map(i => {
            return {
                PutRequest: {
                    Item: i
                }
            }
        })

        return await ddb.batchWrite(p).promise()
    }
}
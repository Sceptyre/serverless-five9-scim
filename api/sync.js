const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient();
const {initClient, getClient} = require('./interfaces/f9vcc')
const mapUser = require('./helpers/mappers/users')

module.exports.handler = async (event, context, callback) => {
    initClient(
        process.env.F9_USERNAME,
        process.env.F9_PASSWORD
    )

    const vcc = await getClient()
    const usersInfoResponse = await vcc.getUsersInfoAsync('.*')
    const usersInfoList = usersInfoResponse[0].return

    for (u in usersInfoList.map(mapUser.toScim)) {
        try {
            await ddb.put({
                TableName: "USERS",
                Item: u
            }).promise()
        } catch (err) {
            console.log(err)    
        }
    }
}
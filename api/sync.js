const {initClient, getClient} = require('./interfaces/f9vcc')
const mapUser = require('./helpers/mappers/users');
const ddbHelper = require('./helpers/ddb')

module.exports.handler = async (event, context, callback) => {
    initClient(
        process.env.F9_USERNAME,
        process.env.F9_PASSWORD
    )

    const vcc = await getClient()
    const usersInfoResponse = await vcc.getUsersInfoAsync('.*')
    const usersInfoList = usersInfoResponse[0].return

    // Clear table
    await ddbHelper.deleteAll( process.env.USERS_TABLE )

    // Write new data
    await ddbHelper.batchWrite( process.env.USERS_TABLE, usersInfoList.map(mapUser.toScim) )

    // for (u in usersInfoList.map(mapUser.toScim)) {
    //     try {
    //         await ddb.put({
    //             TableName: "USERS",
    //             Item: u
    //         }).promise()
    //     } catch (err) {
    //         console.log(err)    
    //     }
    // }
}
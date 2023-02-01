`
Users Model

EXPECTS INPUT TO BE IN SCIM SYNTAX AND WILL OUTPUT IN SCIM SYNTAX
`

const AWS = require('aws-sdk')
const ddb = new AWS.DynamoDB.DocumentClient()
const logger = require('../helpers/logger')
const ddbHelper = require('../helpers/ddb')

const iF9VCC = require('../interfaces/f9vcc')
const mapUser = require('../helpers/mappers/users')
const mapFilter = require('../helpers/mappers/filter')

module.exports = {
    async getUserById(id) {
        var userName
        const vcc = await iF9VCC.getClient()
        const { Item } = await ddb.get({
            TableName: process.env.USERS_TABLE,
            Key: {
                "id": Number(id)
            }
        }).promise()

        if(!Boolean(Item)) {
            logger.warn(`User ID ${id} not found in Dynamo. Checking Five9...`)

            let usersGeneralInfoListResponse = await vcc.getUsersGeneralInfoAsync('.*')
            let usersGeneralInfoList = usersGeneralInfoListResponse[0].return

            userName = usersGeneralInfoList.find(
                u => u.id == id
            )?.userName
        } else {
            userName = Item.userName
        }

        if(!userName) { throw new Error('User Not Found') }

        let userInfoResponse = await vcc.getUserInfoAsync( {userName: userName} )
        let userInfo = userInfoResponse[0].return

        if(!userInfo) { throw new Error('Unable To Get User Info') }

        return mapUser.toScim(userInfo)
    },
    async getUsers(params = {
		startIndex: 1,
		count: 10,
		filter: null
	}) {        
        let p = {}

        // Parse Filter String
        if (params.filter) {
            p = mapFilter.toAWS(params.filter)
        }

        console.log(JSON.stringify(p, 0, 4))

        const users = await ddbHelper.scanAll(
            process.env.USERS_TABLE,
            p
        )

        // Build an empty UserList object
        let scimUserList = {
            "Resources": users.slice(
                params.startIndex - 1,
                params.count + params.startIndex - 1
            ),
            "itemsPerPage": params.count,
            "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
            "startIndex": params.startIndex,
            "totalResults": users.length
        }

        return scimUserList
    },
    async deleteUser(id) {
        const vcc = await iF9VCC.getClient()

        let user = await this.getUserById(id)
        let getUserResponse = await vcc.getUserInfoAsync({userName: user.userName})
        let userData = getUserResponse[0].return

        // Deactivate
        userData.generalInfo.active = false

        let modifyUserResponse = await vcc.modifyUserAsync({
            userGeneralInfo: userData.generalInfo
        })
        let modifiedUser = mapUser.toScim(modifyUserResponse[0].return)

        // update table entry
        await ddb.update({
            TableName: process.env.USERS_TABLE,
            Item: modifiedUser,
            Key: {
                'id': modifiedUser.id
            }
        }).promise()
    },
    async updateUser(id, data) {
        const vcc = await iF9VCC.getClient()

        let user = await this.getUserById(id)
        let getUserResponse = await vcc.getUserInfoAsync({userName: user.userName})
        let oldUserData = getUserResponse[0].return

        let newUserData = {
            ...oldUserData,
            ...mapUser.toFive9(data)
        }

        // Maintain configured userName
        newUserData.generalInfo.userName = oldUserData.generalInfo.userName

        let modifyUserResponse = await vcc.modifyUserAsync({
            userGeneralInfo: newUserData.generalInfo,
            rolesToSet: newUserData.roles,
            rolesToRemove: newUserData.rolesToRemove
        })
        let modifiedUser = mapUser.toScim(modifyUserResponse[0].return)

        // Maintain original id
        modifiedUser.id = id

        // update table entry
        await ddb.put({
            TableName: process.env.USERS_TABLE,
            Item: modifiedUser
        }).promise()

        return modifiedUser
    },
    async createUser(data) {
        const vcc = await iF9VCC.getClient()

        let user = mapUser.toFive9(data)
        delete user.rolesToRemove

        let createUserResponse = await vcc.createUserAsync({
            userInfo: user
        })
    
        let createdUser = mapUser.toScim(createUserResponse[0].return)


        // Assign user to group if user is an agent or supervisor
        if (process.env.F9_NEW_USER_GROUP && (user.roles?.agent || user.roles?.supervisor)) {
            await vcc.modifyAgentGroupAsync({
                group: {name: process.env.F9_NEW_USER_GROUP},
                addAgents: [ createdUser.userName ]
            })
        }

        // Add created user to user table
        await ddb.put({
            TableName: process.env.USERS_TABLE,
            Item: createdUser
        }).promise()

        return createdUser
    }
}
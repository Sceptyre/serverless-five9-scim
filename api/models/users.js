`
Users Model

EXPECTS INPUT TO BE IN SCIM SYNTAX AND WILL OUTPUT IN SCIM SYNTAX
`

const iF9VCC = require('../interfaces/f9vcc')
const mapUser = require('../helpers/mappers/users')

const { parse, filter } = require('scim2-parse-filter');

module.exports = {
    async getUserById(id) {
        const vcc = await iF9VCC.getClient()

        let usersGeneralInfoListResponse = await vcc.getUsersGeneralInfoAsync('.*')
        let usersGeneralInfoList = usersGeneralInfoListResponse[0].return

        let user = usersGeneralInfoList.find(
            u => u.id == id
        )

        if(!user) {throw new Error('User Not Found')}

        let userInfoResponse = await vcc.getUserInfoAsync({userName: user.userName})
        let userInfo = userInfoResponse[0].return

        if(!userInfo) {throw new Error('Unable To Get User Info')}

        return mapUser.toScim(userInfo)
    },
    async getUsers(params = {
		startIndex: 1,
		count: 10,
		filter: null
	}) {        
        const vcc = await iF9VCC.getClient()
        var f;

        // Parse Filter String
        if (params.filter) {
            let p = parse(params.filter)        
            f = filter(p)
        }

        let usersInfoListResponse = await vcc.getUsersInfoAsync('.*')
        let usersInfoList = usersInfoListResponse[0].return

        let resources = params.filter ? 
            usersInfoList.map(mapUser.toScim).filter(f):
            usersInfoList.map(mapUser.toScim)

        // Build an empty UserList object
        let scimUserList = {
            "Resources": resources.slice(
                params.startIndex - 1,
                params.count + params.startIndex - 1
            ),
            "itemsPerPage": params.count,
            "schemas": ["urn:ietf:params:scim:api:messages:2.0:ListResponse"],
            "startIndex": params.startIndex,
            "totalResults": resources.length
        }

        return scimUserList
    },
    async deleteUser(id) {
        const vcc = await iF9VCC.getClient()

        const user = this.getUserById(id)
        user.generalInfo.active = false

        vcc.modifyUserAsync(
            {
                userGeneralInfo: user.generalInfo
            }
        )
    },
    async updateUser(id, data) {
        const vcc = await iF9VCC.getClient()

        let oldUserData = await this.getUserById(id)

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
        let modifiedUser = modifyUserResponse[0].return

        return mapUser.toScim(modifiedUser)
    },
    async createUser(data) {
        const vcc = await iF9VCC.getClient()

        let user = mapUser.toFive9(data)
        delete user.rolesToRemove

        let createUserResponse = await vcc.createUserAsync({
            userInfo: user
        })

        let createdUser = createUserResponse[0].return

        return mapUser.toScim(createdUser)
    }
}
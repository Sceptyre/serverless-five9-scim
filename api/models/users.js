const iF9VCC = require('../interfaces/f9vcc')
const mapUser = require('../helpers/mappers/users')

module.exports = {
    async getUserById(id) {
        let vcc = await iF9VCC.getClient()

        let usersGeneralInfoListResponse = await vcc.getUsersGeneralInfoAsync('.*')
        let usersGeneralInfoList = usersGeneralInfoListResponse[0].return

        let user = usersGeneralInfoList.find(
            u => u.id == id
        )

        if(!user) {throw new Error('User Not Found')}

        let userInfoResponse = await vcc.getUserInfoAsync({userName: user.userName})
        let userInfo = userInfoResponse[0].return

        if(!userInfo) {throw new Error('Unable To Get User Info')}

        return userInfo
    },
    async getUsers(params = {}) {        
        let vcc = await iF9VCC.getClient()

        params = {
            // Default params
            ...{
                startIndex: 1,
                count: 10,
                filter: null
            },
            // Defined params
            ...params
        }

        params.startIndex = Number(params.startIndex)
	    params.count = Number(params.count)

        let usersInfoListResponse = await vcc.getUsersInfoAsync('.*')
        let usersInfoList = usersInfoListResponse[0].return

        return usersInfoList
    },
    async deleteUser(id) {
        let vcc = await iF9VCC.getClient()
    },
    async updateUser(id, data) {
        let vcc = await iF9VCC.getClient()
    },
    async createUser(data) {
        let vcc = await iF9VCC.getClient()
    }
}
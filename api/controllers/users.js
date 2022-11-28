const mUsers = require('../models/users')
const vUserReponse = require('../views/userresponse')
const vUserListResponse = require('../views/userlistresponse')
const vErrorResponse = require('../views/errorresponse')

module.exports = {
    async GETUserById(req, res, next) {
        try {
            let u = await mUsers.getUserById(req.params.id)
            res.status(200).json(vUserReponse(u))
        } catch (err) {
            next(err)
        }
    },
    async GETUsers(req, res, next) {
        try {
            let u = await mUsers.getUsers()
            res.status(200).json(u)
        } catch (err) {
            next(err)
        }
    },
    async PUTUser(req, res) {
        try {

        } catch (err) {
            next(err)
        }
    },
    async POSTUser(req, res) {
        try {

        } catch (err) {
            next(err)
        }
    },
    async DELETEUser(req, res) {
        try {

        } catch (err) {
            next(err)
        }
    }
}
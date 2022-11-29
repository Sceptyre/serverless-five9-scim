const mUsers = require('../models/users')

module.exports = {
    async GETUserById(req, res, next) {
        try {
            let u = await mUsers.getUserById(req.params.id)
            res.status(200).json(u)
        } catch (err) {
            next(err)
        }
    },
    async GETUsers(req, res, next) {
        try {
            let params = {}
            params.startIndex = Number(req.query.startIndex) || 1
            params.count = Number(req.query.count) || 10
            params.filter = req.query.filter || null

            let u = await mUsers.getUsers(params)
            res.status(200).json(u)
        } catch (err) {
            next(err)
        }
    },
    async PUTUser(req, res, next) {
        try {
            await mUsers.updateUser(req.params.id, req.body)
                  
        } catch (err) {
            next(err)
        }
    },
    async POSTUser(req, res, next) {
        try {
            await mUsers.createUser(req.body)
        } catch (err) {
            next(err)
        }
    },
    async DELETEUser(req, res, next) {
        try {
            await mUsers.deleteUser(req.params.id)
        } catch (err) {
            next(err)
        }
    }
}
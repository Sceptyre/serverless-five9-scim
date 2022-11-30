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
            let u = await mUsers.updateUser(req.params.id, req.body)
            res.status(200).json(u)
                  
        } catch (err) {
            next(err)
        }
    },
    async POSTUser(req, res, next) {
        try {
            let u = await mUsers.createUser(req.body)
            res.status(201).json(u)
        } catch (err) {
            next(err)
        }
    },
    async DELETEUser(req, res, next) {
        try {
            await mUsers.deleteUser(req.params.id)
            res.status(204).send()
        } catch (err) {
            next(err)
        }
    }
}
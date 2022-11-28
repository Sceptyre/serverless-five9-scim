const express = require('express')
const r = express.Router()

const cUsers = require('../../controllers/users')

r.get('/', cUsers.GETUsers)
r.get('/:id', cUsers.GETUserById)

r.post('/', cUsers.POSTUser)

r.put('/:id', cUsers.PUTUser)

r.delete('/:id', cUsers.DELETEUser)

module.exports = r
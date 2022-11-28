const express = require('express')
const r = express.Router()

const rScimUsers = require('./scim/users')

r.use('/scimv2/Users', rScimUsers)

module.exports = r
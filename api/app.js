const serverless = require("serverless-http");
const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const rRoot = require('./routers/root')
const mwError = require('./middlewares/error')
const mwLogger = require('./middlewares/logger')
const mwAuth = require('./middlewares/auth')

// init five9 soap interface
const iF9VCC = require('./interfaces/f9vcc')
iF9VCC.initClient(
    process.env.F9_USERNAME,
    process.env.F9_PASSWORD
)
// Apply json parser
app.use(bodyParser.json({type:['application/json','application/scim+json','application/json+scim']}));
app.use(bodyParser.raw());

// Auth middleware
app.use(mwAuth)

// Logging middleware
app.use(mwLogger)

// Map root router
app.use(rRoot)

// Error handling middleware
app.use(mwError)

// Start listening to requests
// app.listen(process.env.HTTP_PORT || 80)

module.exports.handler = serverless(app)
const vErrorResponse = require('../views/errorresponse')
const logger = require('../helpers/logger')

module.exports = async (err, req, res, next) => {
    logger.error(err.message)
    res.status(500).json(vErrorResponse(err.message))
}
const logger = require('../helpers/logger')

module.exports = async (req, res, next) => {
    logger
        .info(`Incoming ${req.method} Request For: ${req.url}`)
    req.body ? logger.info(`Request Body: ${JSON.stringify(req.body)}`) : null

    logger
        .debug(`Query Params: ${req.query}`)
        .debug(`Body: ${req.body}`)

    next()
}
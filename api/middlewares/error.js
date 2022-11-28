const vErrorResponse = require('../views/errorresponse')

module.exports = async (err, req, res, next) => {
    res.status(500).json(vErrorResponse(err.message))
}
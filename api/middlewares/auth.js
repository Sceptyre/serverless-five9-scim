const vErrorResponse = require('../views/errorresponse')

module.exports = (req, res, next) => {
    try {
        if (req.headers.authorization == `Bearer ${Buffer.from(process.env.SERVICE_TOKEN).toString('base64')}`) {
            next()
        } else {
            throw new Error('Unauthorized')
        }
    } catch (err) {
        res
            .status(401)
            .send(vErrorResponse(401, err.message))
    }
}
const vErrorResponse = require('../views/errorresponse')

module.exports = (req, res, next) => {
    if (req.headers.authorization == `Bearer ${Buffer.from(process.env.SERVICE_TOKEN).toString('base64')}`) {
        next()
    } else {
        res
            .status(401)
            .send(vErrorResponse(401, "Unauthorized Request"))
    }
}
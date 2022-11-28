const soap = require('soap')

var _username 
var _password

module.exports = {
    initClient(username, password) {
        _username = username,
        _password = password

    },
    
    async getClient() {
        let c = await soap.createClientAsync(
            `https://api.five9.com/wsadmin/v13/AdminWebService?wsdl&user=${_username}`,
            {stream: true}
        )

        c.setSecurity(
            new soap.BasicAuthSecurity(
                _username, _password
            )
        )

        return c
    }
}
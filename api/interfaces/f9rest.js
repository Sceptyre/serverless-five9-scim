const axios = require('axios')

var _client

module.exports = {
    async initClient() {
    
    },
    
    getClient() {
        return _client
    }
}
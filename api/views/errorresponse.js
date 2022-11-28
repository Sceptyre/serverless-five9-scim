module.exports = (errorCode, errorMessage) => {
    return {
        "schemas": ["urn:ietf:params:scim:api:messages:2.0:Error"],
        "detail": errorMessage,
        "status": errorCode
    }
}
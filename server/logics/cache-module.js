let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
let dataMap = new Map();

function get(key) {
    if (key == null || key==undefined){
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }
    return dataMap.get(key);
}

function set(key, value) {
    dataMap.set(key, value);
}

function clearUserCache(key) {
    dataMap.delete(key);
}

function extractUserDataFromCache(request) {
    let authorizationString = request.headers["authorization"];
    console.log("authorizationString", authorizationString);

    if(authorizationString !==undefined){
        let token = authorizationString?.substring("Bearer ".length);
        let userData = get(token);  
        return [userData, token];            
    }
}

module.exports = {
    clearUserCache,
    set,
    get,
    extractUserDataFromCache,
    dataMap
}
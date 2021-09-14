const expressJwt = require('express-jwt');
const config = require('../config.json');

let { secret } = config;

let whiteListUrls = new Set();
whiteListUrls.add('/users/login');
whiteListUrls.add('/users/register');

function authenticateJwtRequestToken() {
    return expressJwt({ secret, algorithms: ['sha1', 'RS256', 'HS256'] }).unless(request => {
        if (request.method == 'POST' && request.url.endsWith('/users')) {
            return true;
        };

        if (request.method == 'GET' && request.url.endsWith('/locations')) {
            return true;
        };

        if (request.method == 'GET' && request.url.includes('/images')) {
            return true;
        };

        if (whiteListUrls.has(request.url)) {
            return true;
        };

        return false;
    });
}

module.exports = authenticateJwtRequestToken;
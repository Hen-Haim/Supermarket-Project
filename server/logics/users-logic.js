const usersDao = require("../dao/users-dao");
const config = require("../config.json");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");
const cacheModule = require("../logics/cache-module");

const crypto = require("crypto");
const jwt = require('jsonwebtoken');

const spiceRight = "jernc#%^Hiodfuver,mn";
const spiceLeft = "@!nlcmf-lspns;$- ";


async function registerPart1 (userDetails){
    registerValidationPart1(userDetails);
    await usersDao.registerPart1(userDetails.userName);
}

async function registerPart2 (userDetails){
    registerValidationPart2(userDetails);
    userDetails.password = crypto.createHash("md5").update(spiceLeft + userDetails.password + spiceRight).digest("hex");
    await usersDao.registerPart2(userDetails);
}

async function login (userDetails){
    loginValidation(userDetails);
    userDetails.password = crypto.createHash("md5").update(spiceLeft + userDetails.password + spiceRight).digest("hex");
    let userData = await usersDao.login(userDetails);
    const token = generateToken(userData, userDetails);

    let successfulLoginResponse = { token: token, role: userData.role };
    return successfulLoginResponse;
}

function generateToken(userData, userDetails){
    let spicedUserName = spiceLeft + userDetails.userName + spiceRight;
    const jwtToken = jwt.sign({sub:spicedUserName}, config.secret);
    cacheModule.set(jwtToken, userData);
    return jwtToken
}

async function getOneUserAddress(idUser) {
    let userDetails = await usersDao.getOneUserAddress(idUser);
    return userDetails;
}

// async function update (userDetails,fromCache){
//     isCacheModuleReset(fromCache[0]);
//     userDetails.id = fromCache[0].id
//     updateValidation(userDetails);

//     userDetails.password = crypto.createHash("md5").update(spiceLeft + userDetails.password + spiceRight).digest("hex");    
//     let userUpdated = await usersDao.update(userDetails);
//     return userUpdated;
// }


async function deleteUser(fromCache) {
    cacheModule.clearUserCache(fromCache[1]);
    await usersDao.deleteUser(fromCache[0].id);
}



//****************validations*******************//

// function isCacheModuleReset(fromCacheDetails){
//     if(fromCacheDetails===undefined){
//         throw new ServerError(ErrorType.CACHE_MODULE_RESET);
//     }
// }

function registerValidationPart1(userDetails){
    if(!isEmailFormat(userDetails.userName)){
        throw new ServerError(ErrorType.USER_NAME_IS_NOT_EMAIL);
    }

    if(userDetails.userName == undefined){
        throw new ServerError(ErrorType.USER_NAME_UNDEFINED);
    }

    if(userDetails.password == undefined){
        throw new ServerError(ErrorType.PASSWORD_UNDEFINED);
    }

    if(userDetails.password.length > 12){
        throw new ServerError(ErrorType.PASSWORD_TOO_LONG);
    }

    if(userDetails.password.length < 6){
        throw new ServerError(ErrorType.PASSWORD_TOO_SHORT);
    }
};

function registerValidationPart2(userDetails){
    if(userDetails.firstName == undefined){
        throw new ServerError(ErrorType.FIRST_NAME_UNDEFINED);
    }
    if(userDetails.lastName == undefined){
        throw new ServerError(ErrorType.LAST_NAME_UNDEFINED);
    }
    if(userDetails.city == undefined){
        throw new ServerError(ErrorType.CITY_UNDEFINED);
    }
    if(userDetails.street == undefined){
        throw new ServerError(ErrorType.STREET_UNDEFINED);
    }    
};

function loginValidation(userDetails){
    if(userDetails.userName == undefined){
        throw new ServerError(ErrorType.USER_NAME_UNDEFINED);
    }

    if(userDetails.password == undefined){
        throw new ServerError(ErrorType.PASSWORD_UNDEFINED);
    }
};

// function updateValidation(userDetails){
//     if(userDetails.password == undefined){
//         throw new ServerError(ErrorType.PASSWORD_UNDEFINED);
//     }

//     if(userDetails.password.length > 12){
//         throw new ServerError(ErrorType.PASSWORD_TOO_LONG);
//     }

//     if(userDetails.password.length < 6){
//         throw new ServerError(ErrorType.PASSWORD_TOO_SHORT);
//     }

//     if(userDetails.firstName == undefined){
//         throw new ServerError(ErrorType.FIRST_NAME_UNDEFINED);
//     }

//     if(userDetails.lastName == undefined){
//         throw new ServerError(ErrorType.LAST_NAME_UNDEFINED);
//     }
// };


function isEmailFormat (username){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(username).toLowerCase());
}


module.exports = {
    registerPart1,
    registerPart2,
    login,
    // ,
    // update,
    getOneUserAddress,
    deleteUser
}
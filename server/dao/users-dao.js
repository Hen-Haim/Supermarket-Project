const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("./../errors/server-error");


async function registerPart1 (userName){
    const sql = 'SELECT user_name FROM users WHERE user_name = ?;';
    try{
        const userNameExistResult = await connection.executeWithParameters(sql, [userName]);

        if (userNameExistResult.length !== 0) {
            throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST);
        }
    }catch (err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userName), err);
    }
};

async function registerPart2(userDetails){
    const sql = `INSERT INTO users (user_name, password, first_name, last_name, role, city, street) VALUES (?,?,?,?,?,?,?);`
    if(userDetails.role ==undefined){
        userDetails.role = 0;
    }else if (userDetails.role === 1){
        userDetails.city = null
        userDetails.street = null        
    }
    
    let parameters = [
        userDetails.userName, 
        userDetails.password, 
        userDetails.firstName, 
        userDetails.lastName, 
        userDetails.role,
        userDetails.city,
        userDetails.street
    ];

    try{
        const userRegistrationResult = await connection.executeWithParameters(sql, parameters);
        if(userRegistrationResult.insertId ==0){
            throw new ServerError(ErrorType.USER_NAME_ALREADY_EXIST)
        }
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userDetails), err)
    }
}
async function login(user) {

    let sql = `SELECT id, role FROM users WHERE user_name =? AND password =?`;
    let parameters = [user.userName, user.password];
    let userLoginResult;

    try {
        userLoginResult = await connection.executeWithParameters(sql, parameters);
        if(userLoginResult.length===0){
            throw new ServerError(ErrorType.UNAUTHORIZED)
        }
    }
    catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(user), err);
    }
    
    return userLoginResult[0];
}

// async function update(updateUserDetails){
//     const sql = `UPDATE users SET password = ?, first_name=?, last_name=? WHERE id = ?;`;
//     let parameters = [
//         updateUserDetails.password, 
//         updateUserDetails.firstName, 
//         updateUserDetails.lastName, 
//         updateUserDetails.id
//     ];

//     try{
//         let user = await connection.executeWithParameters(sql, parameters);
//         return user; 

//     }catch(err){
//         throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(updateUserDetails), err)
//     }   
// }

async function getOneUserAddress(userId) {
    let sql = `SELECT city, street FROM users WHERE id=?`;
    let parameters = [userId];

    try{
        let userDetails = await connection.executeWithParameters(sql, parameters);
        return userDetails[0];

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), err)
    }
}

async function deleteUser(id) {
    let sql = "DELETE FROM users WHERE id=?";
    let parameters = [id];

    try{
        await connection.executeWithParameters(sql, parameters);
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(id), err)
    }
}



module.exports = {
    registerPart1,
    registerPart2,
    login,
    // update,
    getOneUserAddress,
    deleteUser
}
const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function addShoppingCart(userId){
    const sql = `INSERT INTO shopping_carts (id_user) VALUES (?);`;
    try{
        let results = await connection.executeWithParameters(sql, [userId]);
        return results.insertId
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), err);
    }
}

async function updateShoppingCart(shoppingCartId, userId){
    const sql = `UPDATE shopping_carts SET id_user=? WHERE id_user=-1 && id= ?;`;
    let parameters = [
        userId,
        shoppingCartId
    ];

    try{
        let updatedShoppingCart = await connection.executeWithParameters(sql, parameters);
        if(updatedShoppingCart.length === 0){
            throw new ServerError(ErrorType.UNAUTHORIZED)
        } 

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }   
}

async function deleteShoppingCart(shoppingCartId, userId) {
    let sql = `DELETE FROM shopping_carts WHERE id_user=? && id= ?;`;
    let parameters = [
        userId,
        shoppingCartId
    ];
    try{
        const deleteThisShoppingCart = await connection.executeWithParameters(sql, parameters);
        if(deleteThisShoppingCart.length===0){
            throw new ServerError(ErrorType.UNAUTHORIZED)
        }

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}



module.exports = {
    addShoppingCart,
    updateShoppingCart,
    deleteShoppingCart
}
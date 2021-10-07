const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function addShoppingCart(userId){
    let sql;
    if(userId !== -1){
        sql = `SELECT shopping_carts.id AS idShoppingCart, shopping_carts.id_user, orders.ordering_date FROM shopping_carts 
            LEFT JOIN orders ON orders.id_shopping_cart = shopping_carts.id
            WHERE shopping_carts.id_user = ${userId}`;
        try {
          let openCartItems = await connection.execute( sql );

          for(let i= 0; i<openCartItems.length;i++){
            if(openCartItems[i].ordering_date == null){
                deletingMoreThanOneOpenCart( openCartItems[i].idShoppingCart, userId)
                return openCartItems[i].idShoppingCart 
            }
          }
        return addingTheCart(userId)
          
        } catch (err) {
          throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
        }
    }else {    
        return addingTheCart(userId)
    }
}

async function addingTheCart(userId){
    let sql = `INSERT INTO shopping_carts (id_user) VALUES (?);`;
    try{
        let results = await connection.executeWithParameters(sql, [userId]);
        return results.insertId
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(userId), err);
    }
}

async function updateShoppingCart(shoppingCartId, userId){
    let sql;
    sql = `SELECT shopping_carts.id AS idShoppingCart, shopping_carts.id_user, orders.ordering_date FROM shopping_carts 
        LEFT JOIN orders ON orders.id_shopping_cart = shopping_carts.id
        WHERE shopping_carts.id_user =  ${userId}`;
    try {
        let openCartItems = await connection.execute( sql );

        for(let i= 1; i<openCartItems.length;i++){
            if(openCartItems[i].ordering_date === null){
                deletingMoreThanOneOpenCart(shoppingCartId, userId)
                return openCartItems[i].idShoppingCart 
            }
        }
        
    } catch (err) {
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
    }

    sql = `UPDATE shopping_carts SET id_user=? WHERE id_user=-1 && id= ?;`;
    let parameters = [
        userId,
        shoppingCartId
    ];

    try{
        let updatedShoppingCart = await connection.executeWithParameters(sql, parameters);
        if(updatedShoppingCart.length === 0){
            throw new ServerError(ErrorType.UNAUTHORIZED)
        } 
        return shoppingCartId

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }   
}

async function deletingMoreThanOneOpenCart (shoppingCartId, userId){
    const sql = `DELETE FROM shopping_carts WHERE id_user = ${userId} AND id != ${shoppingCartId}`;
    
    try{
        await connection.execute(sql);

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    } 
}


module.exports = {
    addShoppingCart,
    updateShoppingCart
}
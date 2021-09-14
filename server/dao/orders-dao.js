const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function addOrder(orderDetails){
    const sql = `INSERT INTO orders (id_user, id_shopping_cart, final_price , city_to_deliver, street_to_deliver, 
        shipping_date, card_last_digits) 
        VALUES ( ?, ?, 
        (SELECT SUM(total_price) FROM shopping_cart_items WHERE id_shopping_cart = ${orderDetails.idShoppingCart}), ?, ?, ?, ?)`

    let parameters = [
        orderDetails.idUser,        
        orderDetails.idShoppingCart,
        orderDetails.cityToDeliver,
        orderDetails.streetToDeliver,        
        orderDetails.shippingDate,
        orderDetails.cardLastDigits,
    ];

    try{
        await connection.executeWithParameters(sql, parameters);
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(orderDetails), err)
    }
}

async function countProductsUsersAndOrders() {
    let sql = `SELECT (SELECT COUNT(*) FROM products ) AS numOfProducts,
        (SELECT COUNT(*) FROM orders ) AS numOfOrders,
        (SELECT COUNT(*) FROM users ) AS numOfUsers` ;

    try{
        let productsUsersAndOrders = await connection.execute(sql);
        console.log("checking how it returns lalala", productsUsersAndOrders);
        return productsUsersAndOrders;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

async function isTheDateAvailable(date) {
    let sql = `SELECT COUNT(*) AS count FROM supermarket.orders WHERE shipping_date = "${date}"` ;

    try{
        let howManyOrderOnThisDate = await connection.execute(sql);
        return howManyOrderOnThisDate[0].count;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}


module.exports = {
    addOrder,
    isTheDateAvailable,
    countProductsUsersAndOrders
}
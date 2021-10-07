const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");

async function addShoppingCartItem(shoppingCartItemDetails) {
  const sql = `INSERT INTO shopping_cart_items (id_product, id_shopping_cart, amount, total_price)
        VALUES ( ?, (SELECT id FROM shopping_carts WHERE shopping_carts.id_user = ? AND shopping_carts.id = ?), ?, 
        (SELECT products.price FROM products WHERE products.id = ?) * ?)`;
  let parameters = [
    shoppingCartItemDetails.idProduct,
    shoppingCartItemDetails.userId,
    shoppingCartItemDetails.idShoppingCart,
    shoppingCartItemDetails.amount,
    shoppingCartItemDetails.idProduct,
    shoppingCartItemDetails.amount,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (err) {
    throw new ServerError( ErrorType.GENERAL_ERROR, JSON.stringify(shoppingCartItemDetails), err );
  }
}

async function updateShoppingCartItem(updateShoppingCartItemDetails) {
  const sql = `UPDATE shopping_cart_items SET amount = ?, 
            total_price = (SELECT (products.price * ?) FROM products WHERE products.id = ?) WHERE id = ?`;
  let parameters = [
    updateShoppingCartItemDetails.amount,
    updateShoppingCartItemDetails.amount,
    updateShoppingCartItemDetails.idProduct,
    updateShoppingCartItemDetails.id,
  ];

  try {
    let updatedShoppingCartItem = await connection.executeWithParameters(
      sql,
      parameters
    );
    return updatedShoppingCartItem;
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
}

async function openCartFromThisUser(userId, shoppingCartId) {
  let sql;
  let conditioningForCartId = "", conditioningForCartId2 = "";

  if (userId === -1 && Object.keys(JSON.stringify(shoppingCartId)).length !== 0) {
    conditioningForCartId = `AND sci.id_shopping_cart = ${+shoppingCartId}`;
    conditioningForCartId2 = `shopping_carts.id = ${+shoppingCartId} AND `;
  }

  sql = `	(
          SELECT sci.id, products.name ,sci.id_product AS idProduct, products.Id_category AS idCategory,
            sci.amount, (products.price*sci.amount) AS totalPrice, shopping_carts.id_user AS idUser,
            sci.id_shopping_cart AS idShoppingCart, products.picture,
            (SELECT COUNT(*) FROM shopping_cart_items WHERE shopping_carts.id = id_shopping_cart) AS numOfItems,
            (SELECT SUM(products.price*sci.amount) 
              FROM shopping_cart_items sci 
              JOIN shopping_carts ON sci.id_shopping_cart = shopping_carts.id && shopping_carts.id_user=${userId}
              JOIN products ON sci.id_product = products.id
              LEFT JOIN orders ON sci.id_shopping_cart = orders.id_shopping_cart WHERE orders.ordering_date IS NULL
              ${conditioningForCartId}
            ) AS finalPrice
            FROM shopping_cart_items sci 
            JOIN shopping_carts ON sci.id_shopping_cart = shopping_carts.id && shopping_carts.id_user=? 
            JOIN products ON sci.id_product = products.id 
            LEFT JOIN orders ON sci.id_shopping_cart = orders.id_shopping_cart WHERE orders.ordering_date IS NULL
            ${conditioningForCartId}
          )
          UNION 
          (SELECT 0 AS id, 0 AS name, 0 AS idProduct, 0 AS idCategory, 0 AS amount, 0 AS totalPrice, 
              0 AS idUser, (SELECT shopping_carts.id FROM shopping_carts 
              LEFT JOIN orders ON shopping_carts.id = orders.id_shopping_cart WHERE orders.ordering_date IS NULL       
               AND ${conditioningForCartId2} shopping_carts.id_user = ? ) AS idShoppingCart, "0.png" AS picture,
               (SELECT COUNT(shopping_carts.id) FROM shopping_carts 
               LEFT JOIN orders ON shopping_carts.id = orders.id_shopping_cart WHERE orders.ordering_date IS NULL       
              AND ${conditioningForCartId2} shopping_carts.id_user = ?) AS numOfItems, 
              0 AS finalPrice
            FROM shopping_carts
            GROUP BY idProduct
          ) `;

  let parameters = [userId, userId, userId];
  try {
    let openCartItems = await connection.executeWithParameters( sql, parameters );
    return openCartItems;
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
}

async function pastOrdersFromThisUser(userId) {
  const sql = `SELECT sci.id, products.name, sci.id_product AS idProduct, products.Id_category AS idCategory,
    sci.amount, (products.price*sci.amount) AS totalPrice, orders.id_user AS idUser, 
    sci.id_shopping_cart AS idShoppingCart, orders.ordering_date AS orderingDate, products.picture,
    (
    SELECT COUNT(*) FROM shopping_cart_items sci LEFT JOIN orders ON sci.id_shopping_cart = orders.id_shopping_cart
    WHERE orders.ordering_date IS NOT NULL
    AND orders.id_user = ?    
    AND orders.ordering_date =  ( SELECT MAX(ordering_date) FROM orders )
    ) AS numOfItems
    FROM shopping_cart_items sci 
    JOIN products ON sci.id_product = products.id 
    LEFT JOIN orders ON sci.id_shopping_cart = orders.id_shopping_cart
    WHERE orders.ordering_date IS NOT NULL
    AND orders.id_user = ?    
    AND orders.ordering_date =  ( SELECT MAX(ordering_date) FROM orders )
    GROUP BY sci.id_product
    ORDER BY orders.ordering_date DESC; `;

  let parameters = [userId, userId];

  try {
    let lastOrderItems = await connection.executeWithParameters( sql, parameters );
    if ( lastOrderItems == null || lastOrderItems.length === 0 ) {
      return null;
    }
    return lastOrderItems;
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
}

async function popularShoppingCartItems() {
  const sql = `(SELECT (SELECT picture FROM products WHERE shopping_cart_items.id_product = products.id) AS picture,
              (SELECT id_category FROM products WHERE shopping_cart_items.id_product = products.id) AS idCategory, 
                  COUNT(id_product) MostPopular FROM shopping_cart_items GROUP BY id_product ORDER BY MostPopular DESC LIMIT 3)
                  UNION
              (SELECT picture AS picture, id_category AS idCategory, null AS MostPopular FROM products ORDER BY id DESC LIMIT 7)
              ; `;

  try {
    let mostPopularShoppingCartItems = await connection.execute(sql);
    return mostPopularShoppingCartItems;
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
}

async function deleteShoppingCartItem(shoppingCartItemId) {
  let sql = `DELETE FROM shopping_cart_items WHERE id_product=?;`;
  let parameters = [shoppingCartItemId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
}

async function deleteAllShoppingCartItems(userId) {
  let sql = `DELETE shopping_cart_items FROM shopping_cart_items
        INNER JOIN shopping_carts ON shopping_cart_items.id_shopping_cart = shopping_carts.id
        WHERE shopping_carts.id_user = ?;`;
  try {
    await connection.executeWithParameters(sql, [userId]);
  } catch (err) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, err);
  }
}

module.exports = {
  addShoppingCartItem,
  updateShoppingCartItem,
  openCartFromThisUser,
  popularShoppingCartItems,
  deleteAllShoppingCartItems,
  pastOrdersFromThisUser,
  deleteShoppingCartItem,
};

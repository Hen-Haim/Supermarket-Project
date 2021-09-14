const shoppingCartDao = require("../dao/shopping-carts-dao");

async function addShoppingCart(fromCache) {
    let shoppingCartId = await shoppingCartDao.addShoppingCart(fromCache[0].id);
    return shoppingCartId
}

async function updateShoppingCart(shoppingCartId, fromCache) {
    await shoppingCartDao.updateShoppingCart(shoppingCartId, fromCache[0].id);
}

async function deleteShoppingCart(shoppingCartId, fromCache) {
    await shoppingCartDao.deleteShoppingCart(shoppingCartId, fromCache[0].id);
}


module.exports = {
    addShoppingCart,
    updateShoppingCart,
    deleteShoppingCart
}


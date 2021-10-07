const shoppingCartItemsDao = require("../dao/shopping-cart-items-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function addShoppingCartItem(shoppingCartItemDetails,fromCache) {
    addAndUpdateShoppingCartItemValidation(shoppingCartItemDetails);
    shoppingCartItemDetails.userId = fromCache[0].id;
    const shoppingCartItemId = await shoppingCartItemsDao.addShoppingCartItem(shoppingCartItemDetails);
    return shoppingCartItemId;
}

async function updateShoppingCartItems(updateShoppingCartItemDetails) {
    addAndUpdateShoppingCartItemValidation(updateShoppingCartItemDetails);
    await shoppingCartItemsDao.updateShoppingCartItem(updateShoppingCartItemDetails);
}

async function openCartFromThisUser(fromCache, shoppingCartId) {
    let allUserShoppingCartItems = await shoppingCartItemsDao.openCartFromThisUser(fromCache[0].id, shoppingCartId);
    if(allUserShoppingCartItems.length >1){
        allUserShoppingCartItems.splice(-1);
    }
    return allUserShoppingCartItems;
}

async function pastOrdersFromThisUser(fromCache) {
    let allUserShoppingCartItems = await shoppingCartItemsDao.pastOrdersFromThisUser(fromCache[0].id);
    return allUserShoppingCartItems;
}

async function popularShoppingCartItems() {
    let mostPopularShoppingCartItems = await shoppingCartItemsDao.popularShoppingCartItems();
    return mostPopularShoppingCartItems;
}

async function deleteShoppingCartItem(shoppingCartItemId) {
    await shoppingCartItemsDao.deleteShoppingCartItem(shoppingCartItemId);
}

async function deleteAllShoppingCartItems(fromCache) {
    await shoppingCartItemsDao.deleteAllShoppingCartItems(fromCache[0].id);
}


function addAndUpdateShoppingCartItemValidation(shoppingCartItemDetails) {
    if (shoppingCartItemDetails.idProduct== undefined) {
        throw new ServerError(ErrorType.ID_PRODUCT_UNDEFINED);
    }

    if (shoppingCartItemDetails.amount == undefined) {
        throw new ServerError(ErrorType.AMOUNT_UNDEFINED);
    }
}


module.exports = {
    addShoppingCartItem,
    updateShoppingCartItems,
    deleteAllShoppingCartItems,
    popularShoppingCartItems,
    openCartFromThisUser,
    pastOrdersFromThisUser,
    deleteShoppingCartItem
}


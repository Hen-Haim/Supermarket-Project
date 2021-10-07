const orderDao = require("../dao/orders-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function addOrder(orderDetails, fromCache) {
    orderDetails.cardLastDigits = orderDetails.creditCardNumber % 10000;
    addOrderValidation(orderDetails, fromCache[0].role);
    orderDetails.idUser = fromCache[0].id;
    const orderId = await orderDao.addOrder(orderDetails);
    return orderId;
}

async function countProductsUsersAndOrders() {
    let productsUsersAndOrders = await orderDao.countProductsUsersAndOrders();
    return productsUsersAndOrders;
}

async function isTheDateAvailable(date) {
    let howManyOrderOnThisDate = await orderDao.isTheDateAvailable(date);
    dateValidation(howManyOrderOnThisDate)
    return howManyOrderOnThisDate;
}

function dateValidation (data) {
    if (data.count >3) {
        throw new ServerError(ErrorType.DATE_NOT_AVAILABLE);
    }
}

function addOrderValidation(orderDetails, role) {
    if (role == 1) {
        throw new ServerError(ErrorType.UNAUTHORIZED);
    }

    if (orderDetails.idShoppingCart == undefined) {
        throw new ServerError(ErrorType.ID_SHOPPING_CART_UNDEFINED);
    }

    if (orderDetails.cityToDeliver == undefined) {
        throw new ServerError(ErrorType.CITY_TO_DELIVER_UNDEFINED);
    }

    if (orderDetails.streetToDeliver == undefined) {
        throw new ServerError(ErrorType.STREET_TO_DELIVER_UNDEFINED);
    }

    if (orderDetails.shippingDate == undefined) {
        throw new ServerError(ErrorType.SHIPPING_DATE_UNDEFINED);
    }

    if (orderDetails.cardLastDigits == undefined) {
        throw new ServerError(ErrorType.CARD_LAST_FOUR_DIGIT_UNDEFINED);
    }

    if (orderDetails.cardLastDigits.toString().length != 4) {
        throw new ServerError(ErrorType.CARD_LAST_FOUR_DIGIT_IS_NOT_4);
    }
}


module.exports = {
    addOrder,
    isTheDateAvailable,
    countProductsUsersAndOrders
}


let ErrorType = {
    GENERAL_ERROR : {id: 1, httpCode: 600, message : "Oh No! Something Went Wrong", isShowStackTrace: true},
    USER_NAME_ALREADY_EXIST : {id: 2, httpCode: 601, message : "User name already exist", isShowStackTrace: false},
    UNAUTHORIZED : {id: 3, httpCode: 401, message : "You tried to insert, invalidate field", isShowStackTrace: false},
    USER_NAME_IS_NOT_EMAIL :{id: 4, httpCode: 602, message : "Invalid user name, username is not validated as an email address", isShowStackTrace: false},
    USER_NAME_UNDEFINED : {id: 5, httpCode: 603, message : "Missing a field, missing value: username", isShowStackTrace: false},
    PASSWORD_UNDEFINED : {id: 6, httpCode: 604, message : "Missing a field, missing value: password", isShowStackTrace: false},
    UNAUTHORIZED_STATUS : {id: 7, httpCode: 605, message : "You are not authorize to view or do this current action", isShowStackTrace: false},
    CACHE_MODULE_RESET : {id: 8, httpCode: 606, message : "A Problem Occurred And You Are Currently Not Logged-In"},
    DATE_NOT_AVAILABLE : {id: 9, httpCode: 607, message : "Sorry, The date you chose is not available, please choose different one"},
    PASSWORD_TOO_LONG : {id: 10, httpCode: 608, message : "Invalid password, password is too long", isShowStackTrace: false},
    PASSWORD_TOO_SHORT : {id: 11, httpCode: 609, message : "Invalid password, password is too short", isShowStackTrace: false},
    FIRST_NAME_UNDEFINED : {id: 12, httpCode: 610, message : "Missing a field, missing value: firstName", isShowStackTrace: false},
    LAST_NAME_UNDEFINED : {id: 13, httpCode: 611, message : "Missing a field, missing value: lastName", isShowStackTrace: false},
    ID_USER_UNDEFINED : {id: 14, httpCode: 612, message : "Missing a field,  missing value: user id", isShowStackTrace: false},
    ID_SHOPPING_CART_UNDEFINED : {id: 15, httpCode: 613, message : "Missing a field,  missing value: id of shopping cart", isShowStackTrace: false},
    CITY_TO_DELIVER_UNDEFINED : {id: 16, httpCode: 614, message : "Missing a field,  missing value: city to deliver", isShowStackTrace: false},
    STREET_TO_DELIVER_UNDEFINED : {id: 17, httpCode: 615, message : "Missing a field,  missing value: street to deliver", isShowStackTrace: false},
    SHIPPING_DATE_UNDEFINED : {id: 18, httpCode: 616, message : "Missing a field,  missing value: shipping date", isShowStackTrace: false},
    CITY_UNDEFINED : {id: 19, httpCode: 617, message : "Missing a field,  missing value: city", isShowStackTrace: false},
    STREET_UNDEFINED : {id: 20, httpCode: 618, message : "Missing a field,  missing value: four last digit of you card", isShowStackTrace: false},
    CARD_LAST_FOUR_DIGIT_UNDEFINED : {id: 21, httpCode: 619, message : "Missing a field,  missing value: last four digit of your card", isShowStackTrace: false},
    CARD_LAST_FOUR_DIGIT_IS_NOT_4 : {id: 22, httpCode: 620, message : "Invalid 4 last digit of your card", isShowStackTrace: false},
    PRODUCT_NAME_UNDEFINED : {id: 23, httpCode: 621, message : "Missing a field,  missing value: product name", isShowStackTrace: false},
    ID_CATEGORY_UNDEFINED : {id: 24, httpCode: 622, message : "Missing a field,  missing value: id_category", isShowStackTrace: false},
    PRODUCT_PRICE_UNDEFINED : {id: 25, httpCode: 623, message : "Missing a field,  missing value: product price", isShowStackTrace: false},
    PRODUCT_PICTURE_UNDEFINED : {id: 26, httpCode: 624, message : "You didn't send any file as a picture", isShowStackTrace: false},
    CARD_LAST_FOUR_DIGIT_UNDEFINED : {id: 27, httpCode: 625, message : "Missing a field,  missing value: card last 4 digit", isShowStackTrace: false},
    ID_PRODUCT_UNDEFINED : {id: 28, httpCode: 626, message : "Missing a field,  missing value: ID of product", isShowStackTrace: false},
    PRODUCT_ID_UNDEFINED : {id: 29, httpCode: 627, message : "Missing a field,  missing value: product's id", isShowStackTrace: false},
    AMOUNT_UNDEFINED : {id: 30, httpCode: 628, message : "Missing a field,  missing value: product's amount", isShowStackTrace: false},
    NOT_A_PICTURE_FILE : {id: 31, httpCode: 629, message : "Your file you send is not a picture file", isShowStackTrace: false}
}




module.exports = ErrorType;
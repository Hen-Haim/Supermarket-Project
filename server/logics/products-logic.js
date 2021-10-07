const productsDao = require("../dao/products-dao");
let ServerError = require("../errors/server-error");
let ErrorType = require("../errors/error-type");

async function addProduct(productDetails, fromCache, file) {
  addAndUpdateProductValidation(productDetails, fromCache[0].role, file);
  productDetails.pictureFile = file.image;
  const productId = await productsDao.addProduct(productDetails);
  return productId;
}

async function updateProduct(updateProductDetails, fromCache, file) {
  addAndUpdateProductValidation(updateProductDetails, fromCache[0].role, file);
  onlyUpdateValidation(updateProductDetails);
  productDetails.pictureFile = file.image;
  await productsDao.updateProduct(updateProductDetails);
}

async function getAllProducts(shoppingCartId, idFromCache) {
  let products = await productsDao.getAllProducts(shoppingCartId, idFromCache);
  return products;
}

async function searchProducts(searchDetails) {
  let resultsSearchProducts = await productsDao.searchProducts( searchDetails );
  return resultsSearchProducts;
}

function onlyUpdateValidation(productDetails) {
  if (productDetails.idProduct == undefined) {
    throw new ServerError(ErrorType.PRODUCT_ID_UNDEFINED);
  }
}

function addAndUpdateProductValidation(productDetails, role, file) {
  if(!file){
    throw new ServerError(ErrorType.PRODUCT_PICTURE_UNDEFINED);
  }
  if(!file.image){
    throw new ServerError(ErrorType.NOT_A_PICTURE_FILE);
  }
  if (role == 0) {
    throw new ServerError(ErrorType.UNAUTHORIZED_STATUS);
  }
  if (productDetails.name == undefined) {
    throw new ServerError(ErrorType.PRODUCT_NAME_UNDEFINED);
  }
  if (productDetails.idCategory == undefined) {
    throw new ServerError(ErrorType.ID_CATEGORY_UNDEFINED);
  }

  if (productDetails.price == undefined) {
    throw new ServerError(ErrorType.PRODUCT_PRICE_UNDEFINED);
  }
}

module.exports = {
  addProduct,
  updateProduct,
  getAllProducts,
  searchProducts
};

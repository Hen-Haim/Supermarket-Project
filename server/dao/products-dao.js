const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");
const uuid = require('uuid');
const fs = require('fs');
const path = require("path");


async function addProduct(productDetails){
     try{   
        if (!fs.existsSync("./images")) fs.mkdirSync("./images");
        const extension = productDetails.pictureFile.name.substr(productDetails.pictureFile.name.lastIndexOf("."));
        const fileName = `${uuid.v4()}${extension}`;
        productDetails.picture = fileName;

        const absolutePath = path.join(
            __dirname,
            "..",
            "upload",
            `products`,
            fileName
        );
        await productDetails.pictureFile.mv(absolutePath);

        const sql = `INSERT INTO products (id_category, name, price, picture) 
        VALUES ( (SELECT c.id FROM categories c WHERE c.name = ?) ,?,?,?);`
        let parameters = [
            productDetails.nameCategory,
            productDetails.name,        
            productDetails.price,
            productDetails.picture
        ];

        await connection.executeWithParameters(sql, parameters);
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, "error", err)
    }
}

async function updateProduct(updateProductDetails){
    try{    
        const extension = productDetails.pictureFile.name.substr(productDetails.pictureFile.name.lastIndexOf("."));
        const fileName = `${uuid.v4()}${extension}`;
        productDetails.picture = fileName;
        const absolutePath = path.join(
            __dirname,
            "..",
            "upload",
            `products`,
            fileName
        );
        await image.mv(absolutePath);
        
        const sql = `UPDATE products SET name=?, 
        id_category=(SELECT c.id FROM categories c WHERE c.name = ?), 
        price=?, picture=? WHERE id=?`;
        let parameters = [
            updateProductDetails.name,
            updateProductDetails.nameCategory,
            updateProductDetails.price,
            updateProductDetails.picture, 
            updateProductDetails.idProduct
        ];

        let updatedProduct = await connection.executeWithParameters(sql, parameters);
        return updatedProduct; 

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }   
}

async function getAllProducts(shoppingCartId, idFromCache) {
    if(idFromCache === 1){
        shoppingCartId = 0;
    }
    let sql = `SELECT p.id AS idProduct, p.name, p.id_category AS idCategory, 
    ca.name AS nameCategory, p.price, p.picture, 
    COALESCE(sci.amount, 0) AS amount,
    sci.id_shopping_cart AS idShoppingCart
    FROM products p
    JOIN categories ca ON ca.id = p.id_category                    
    LEFT JOIN shopping_cart_items sci ON sci.id_product = p.id && sci.id_shopping_cart = ?
    LEFT JOIN shopping_carts ON sci.id_shopping_cart = shopping_carts.id && shopping_carts.id_user=?
    GROUP BY case when p.name then shopping_carts.id = ? && p.name else p.name end  
    ORDER BY p.id_category` ;

    let parameters = [shoppingCartId, idFromCache, shoppingCartId]

    try{
        let products = await connection.executeWithParameters(sql, parameters);
        return products;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

async function searchProducts(searchDetails) {
    const sql = `SELECT p.id AS idProduct, p.name, p.id_category AS idCategory, 
    ca.name AS nameCategory, p.price, p.picture, 
    COALESCE(sci.amount, 0) AS amount,
    sci.id_shopping_cart AS idShoppingCart
    FROM products p
    JOIN categories ca ON ca.id = p.id_category                    
    LEFT JOIN shopping_cart_items sci ON sci.id_product = p.id && sci.id_shopping_cart = ?
    LEFT JOIN shopping_carts ON sci.id_shopping_cart = shopping_carts.id && shopping_carts.id_user=?
	AND p.name LIKE '%${searchDetails.productsPartialName}%'
    GROUP BY case when p.name then shopping_carts.id = ? && p.name else p.name end  
    ORDER BY p.id_category `

    let parameters = [searchDetails.idShoppingCart, searchDetails.userId, searchDetails.idShoppingCart]
    try{
        let allSearchedProducts = await connection.executeWithParameters(sql, parameters);
        return allSearchedProducts;

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }
}

module.exports = {
    addProduct,
    updateProduct,
    getAllProducts,
    searchProducts
}
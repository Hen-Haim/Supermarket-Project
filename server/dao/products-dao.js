const connection = require("./connection-wrapper.js");
let ErrorType = require("../errors/error-type");
let ServerError = require("../errors/server-error");
const uuid = require('uuid')

async function addProduct(productDetails){
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
    await image.mv(absolutePath);

    const sql = `INSERT INTO products (id_category, name, price, picture) 
    VALUES ( (SELECT c.id FROM categories c WHERE c.name = ?) ,?,?,?);`
    let parameters = [
        productDetails.nameCategory,
        productDetails.name,        
        productDetails.price,
        productDetails.picture
    ];

    try{
        await connection.executeWithParameters(sql, parameters);
    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, JSON.stringify(productDetails), err)
    }
}

async function updateProduct(updateProductDetails){
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

    try{
        let updatedProduct = await connection.executeWithParameters(sql, parameters);
        return updatedProduct; 

    }catch(err){
        throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
    }   
}

async function getAllProducts(shoppingCartId, idFromCache) {
    console.log(shoppingCartId);
    console.log("id", idFromCache)
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
    // console.log("sql", sql)
    console.log("shoppingCartId", shoppingCartId);
    console.log("idFromCache", idFromCache);

    let parameters = [shoppingCartId, idFromCache, shoppingCartId]

    try{
        let products = await connection.executeWithParameters(sql, parameters);
        console.log("products length", products.length);
        console.log("products ", products[0])
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

// async function deleteProduct(productId) {
//     let sql = `DELETE FROM products WHERE id=?;`;
//     let parameters = [productId];
//     try{
//         await connection.executeWithParameters(sql, parameters);

//     }catch(err){
//         throw new ServerError(ErrorType.GENERAL_ERROR, sql, err)
//     }
// }

module.exports = {
    addProduct,
    updateProduct,
    getAllProducts,
    searchProducts
    // deleteProduct
}
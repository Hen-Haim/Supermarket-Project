const express = require("express");
const productsLogic = require("../logics/products-logic");
const cacheModule = require("../logics/cache-module");
const router = express.Router();


//add Product
router.post("/", async (req, res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const productDetails = req.body;
        const image = req.files;
        await productsLogic.addProduct(productDetails, fromCache, image);
        res.json("Adding A New Product, Was A Success!");
        
    }catch(err){
        return next(err);
    }
});

//Update
router.put("/", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const productDetails = req.body;
        const image = req.files;
        await productsLogic.updateProduct(productDetails, fromCache, image);        
        res.json('Updating This Product, Was A Success!');

    }catch(err){
        return next(err);
    }
});

//Get all Products affected by the user and his cart
router.get("/special-get/:idShoppingCart", async (req, res, next) => {
    const idFromCache = cacheModule.extractUserDataFromCache(req)[0].id;
    try {
        const shoppingCartId = +req.params.idShoppingCart;
        const products = await productsLogic.getAllProducts(shoppingCartId, idFromCache);
        res.json(products);

    } catch (err) {
        return next(err);
    }
});

//Search By Name
router.get('/:search/:idShoppingCart', async (req, res,next) => {
    const idFromCache = cacheModule.extractUserDataFromCache(req)[0].id;
    try {
        const productsPartialName = req.params.search;
        const idShoppingCart = +req.params.idShoppingCart;
        let searchDetails = {};
        searchDetails.idShoppingCart = idShoppingCart;
        searchDetails.userId = idFromCache;        
        searchDetails.productsPartialName = productsPartialName;
        const products = await productsLogic.searchProducts(searchDetails);
        res.json(products);

    } catch (err) {
        return next(err);
    }
});

module.exports = router
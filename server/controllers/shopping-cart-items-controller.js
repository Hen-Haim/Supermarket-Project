const express = require("express");
const shoppingCartItemsLogic = require("../logics/shopping-cart-items-logic");
const cacheModule = require("../logics/cache-module");
const router = express.Router();


//add shoppingCartItem
router.post("/:idShoppingCart", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const idShoppingCart = +req.params.idShoppingCart;
        let shoppingCartItemDetails = req.body;
        shoppingCartItemDetails.idShoppingCart = idShoppingCart
        await shoppingCartItemsLogic.addShoppingCartItem(shoppingCartItemDetails,fromCache);
        res.json("Adding A New Vacation, Was A Success!");
        
    }catch(err){
        return next(err);
    }
});

//Update
router.patch("/:idItem", async (req,res, next)=>{
    try{
        const shoppingCartItemId = +req.params.idItem;
        let shoppingCartItemDetails = req.body;
        shoppingCartItemDetails.idProduct = shoppingCartItemId;
        await shoppingCartItemsLogic.updateShoppingCartItems(shoppingCartItemDetails);        
        res.json('Updating This shoppingCartItem, Was A Success!');
    
    }catch(err){
        return next(err);
    }
});

//Get all shoppingCartItems for user with an open cart
router.get('/open-cart/:idShoppingCart', async (req, res, next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        const shoppingCartId = +req.params.idShoppingCart;
        console.log("shoppingCartId", shoppingCartId);
        const shoppingCartItemsOrFalse = await shoppingCartItemsLogic.openCartFromThisUser(fromCache, shoppingCartId);
        console.log("server until here us fine?")
        res.json(shoppingCartItemsOrFalse);

    } catch (err) {
        return next(err);
    }
});

//Get all shoppingCartItems for user with past orders
router.get('/past-orders', async (req, res,next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        const shoppingCartItemsOrFalse = await shoppingCartItemsLogic.pastOrdersFromThisUser(fromCache);
        res.json(shoppingCartItemsOrFalse);

    } catch (err) {
        return next(err);
    }
});

//Get The 3 Most Popular Products And 6 Of the newest Products
router.get('/popular', async (req, res,next) => {
    try {
        const mostPopularShoppingCartItems = await shoppingCartItemsLogic.popularShoppingCartItems();
        res.json(mostPopularShoppingCartItems);

    } catch (err) {
        return next(err);
    }
});

//Delete All Items
router.delete('/', async (req, res, next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        await shoppingCartItemsLogic.deleteAllShoppingCartItems(fromCache);
        res.send('Deleting All Items From Cart, Was A Success!');
    } catch (err) {
        return next(err);
    }
});


//Delete One Item
router.delete('/:id', async (req, res, next) => {
    try {
        const shoppingCartItemId = +req.params.id;
        console.log('from params', shoppingCartItemId);
        console.log('from params before +', req.params.id);
        await shoppingCartItemsLogic.deleteShoppingCartItem(shoppingCartItemId);
        console.log("i made it here")
        res.send('Deleting This Item From Cart, Was A Success!');

    } catch (err) {
        return next(err);
    }
});


module.exports = router
const express = require("express");
const shoppingCartsLogic = require("../logics/shopping-carts-logic");
const cacheModule = require("../logics/cache-module");

const router = express.Router();

//add shoppingCart
router.post("/", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        let shoppingCartId = await shoppingCartsLogic.addShoppingCart(fromCache);
        res.json(shoppingCartId);

    }catch(err){
        return next(err);
    }
});

//Update
router.put("/:id", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const shoppingCartId = +req.params.id;
        await shoppingCartsLogic.updateShoppingCart(shoppingCartId, fromCache);        
        res.json('Updating This Shopping Cart, Was A Success!');

    }catch(err){
        return next(err);
    }
});

//Delete
router.delete('/:id', async (req, res, next) => {
    const fromCache = cacheModule.extractUserDataFromCache(req); 
    try {
        const shoppingCartId = +req.params.id;
        await shoppingCartsLogic.deleteShoppingCart(shoppingCartId, fromCache);
        res.send('Deleting This Shopping Cart, Was A Success!');

    } catch (err) {
        return next(err);
    }
});

module.exports = router
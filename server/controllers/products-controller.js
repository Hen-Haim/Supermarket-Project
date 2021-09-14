const express = require("express");
const productsLogic = require("../logics/products-logic");
const cacheModule = require("../logics/cache-module");

const router = express.Router();

//add Product
router.post("/", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        const productDetails = req.body;
        const image = request.files;
        await productsLogic.addProduct(productDetails,fromCache, image);
        res.json("Adding A New Product, Was A Success!");
        
    }catch(err){
        return next(err);
    }
});

//Update
router.put("/", async (req,res, next)=>{
    const fromCache = cacheModule.extractUserDataFromCache(req);  
    try{
        // const productId = req.params.id;
        const productDetails = req.body;
        const image = request.files;
        // productDetails.id = productId;        // id or idProduct?
        await productsLogic.updateProduct(productDetails, fromCache, image);        
        res.json('Updating This Product, Was A Success!');

    }catch(err){
        return next(err);
    }
});

//Get all Products affected by the user and hes cart
router.get("/special-get/:idShoppingCart", async (req, res, next) => {
    console.log("here products special get")
    const idFromCache = cacheModule.extractUserDataFromCache(req)[0].id;
    try {
        const shoppingCartId = +req.params.idShoppingCart;
        const products = await productsLogic.getAllProducts(shoppingCartId, idFromCache);
        // console.log('*************************************************************************');
        // console.log('*************************************************************************')
        // console.log('*************************************************************************')
        // console.log('*************************************************************************')
        // console.log('*************************************************************************')
        // console.log('products', products)
        // console.log('*************************************************************************');
        // console.log('*************************************************************************')
        // console.log('*************************************************************************')
        // console.log('*************************************************************************')
        // console.log('*************************************************************************')
        res.json(products);

    } catch (err) {
        return next(err);
    }
});

//Search By Name
router.get('/:search/:idShoppingCart', async (req, res,next) => {
    // console.log('im here controller')
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

router.get("/images/:name", (request, response) => {
    try {
        console.log("come onnnnnnnnnnnnnnnn");
      const name = request.params.name;
      let absolutePath = path.join(__dirname, "..", "upload", "products", name);
      console.log("-------------------------------------");
      console.log("-------------------------------------")
      console.log("-------------------------------------")
      console.log(absolutePath);
      console.log("-------------------------------------")
      console.log("-------------------------------------")
      console.log("-------------------------------------")

      if (!fs.existsSync(absolutePath)) {
        absolutePath = path.join(__dirname, "..", "upload", "not-found.png");
      }
      response.sendFile(absolutePath);
    } catch (err) {
      response.status(500).send(err.message);
    }
  });

// //Delete
// router.delete('/:id', async (req, res, next) => {
//     const fromCache = cacheModule.extractUserDataFromCache(req); 
//     try {
//         const productId = req.params.id;
//         await productLogic.deleteProduct(productId,fromCache);
//         res.send('Deleting This Product, Was A Success!');

//     } catch (err) {
//         return next(err);
//     }
// });

module.exports = router
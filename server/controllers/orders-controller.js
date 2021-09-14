const express = require("express");
const orderLogic = require("../logics/orders-logic");
const cacheModule = require("../logics/cache-module");

const router = express.Router();

//add order
router.post("/", async (req, res, next) => {
  const fromCache = cacheModule.extractUserDataFromCache(req);
  try {
    const orderDetails = req.body;
    await orderLogic.addOrder(orderDetails, fromCache);
    res.json("Adding A New Order, Was A Success!");
  } catch (err) {
    return next(err);
  }
});

//Count all Products Users And Orders
router.get("/", async (req, res, next) => {
  try {
    const productsUsersAndOrders =
      await orderLogic.countProductsUsersAndOrders();
    res.json(productsUsersAndOrders);
  } catch (err) {
    return next(err);
  }
});

//Check for date availability
router.get("/:date", async (req, res, next) => {
  try {
    const date = req.params.date;
    console.log("date", date);
    const productsUsersAndOrders = await orderLogic.isTheDateAvailable(date);
    res.json(productsUsersAndOrders);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;

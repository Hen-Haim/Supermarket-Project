const express = require("express");
const cors = require("cors");
const usersController = require("./controllers/users-controller"); //users
const ordersController = require("./controllers/orders-controller"); //orders
const shoppingCartItemController = require("./controllers/shopping-cart-items-controller"); //shopping-cart-items
const shoppingCartsController = require("./controllers/shopping-carts-controller"); //shopping-carts
const productsController = require("./controllers/products-controller"); //products

const errorHandler = require("./errors/error-handler");
const loginFilter = require("./middleware/login-filter");
let ServerError = require("./errors/server-error");
let ErrorType = require("./errors/error-type");
const fileUpload = require("express-fileupload");

const app = express();

app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());
app.use(fileUpload());
app.use("/products/images", express.static("./upload/products"));
app.use(loginFilter());

app.use(errorHandler.isServerDown);
app.use("/users", usersController); //users
app.use("/orders", ordersController); //orders
app.use("/shopping-cart-items", shoppingCartItemController); //shopping-cart-items
app.use("/shopping-carts", shoppingCartsController); //shopping-carts
app.use("/products", productsController); //products

app.use(() => {
  throw new ServerError(ErrorType.GENERAL_ERROR);
});
app.use(errorHandler.errorHandler);

app.listen(3001, () => console.log("listening to port 3001"));

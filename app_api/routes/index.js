var express = require("express");
var router = express.Router();

var productController = require("../controllers/ProductController");
var commentController = require("../controllers/CommentController");
var userController = require("../controllers/UserController");
var homeController = require("../controllers/HomeController");
var paymentController = require("../controllers/PaymentController");
var orderController = require("../controllers/OrderController");

router.route("/").get((req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Connected to MasanaGelsin API",
  });
});

router.route("/products").get(productController.getProductsByCategory);

router.route("/addProduct").post(productController.addProduct);

router
  .route("/products/:productID")
  .get(productController.getProduct)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

router
  .route("/home")
  .get(homeController.getHomeValues)
  .post(homeController.addHomeValue);

router.post("/addPayment", paymentController.addPayment);

router.get("/comments", commentController.getAllComments);
router.post("/addComment", commentController.addComment);

router.post("/createOrder", orderController.createOrder);

router.post("/register", userController.register);
router.post("/login", userController.login);

module.exports = router;

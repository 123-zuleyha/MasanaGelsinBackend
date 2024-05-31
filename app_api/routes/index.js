var express = require("express");
var router = express.Router();

var homeController = require("../controllers/HomeController");
var orderController = require("../controllers/OrderController");

router.route("/").get((req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Connected to MasanaGelsin API",
  });
});

router
  .route("/home")
  .get(homeController.getHomeValues)
  .post(homeController.addHomeValue);

router.post("/createOrder", orderController.createOrder);

module.exports = router;

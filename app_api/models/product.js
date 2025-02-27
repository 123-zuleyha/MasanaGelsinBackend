var mongoose = require("mongoose");

var product = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
});
mongoose.model("product", product, "products");

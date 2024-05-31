var mongoose = require("mongoose");

var product = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageURL: { type: [String], required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

/*
{
  "name": "pizza",
  "description": "nefis pizza",
  "imageURL": "https://cdn.yemek.com/mnresize/1250/833/uploads/2017/11/karisik-pizza-yeni.jpg",
  "category": "drink"
}
*/
mongoose.model("product", product, "products");

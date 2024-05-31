const mongoose = require("mongoose");

const foods = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const order = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  deskNumber: {
    type: Number,
    required: true,
  },
  foods: [foods],
  note: {
    type: String,
    default: "",
  },
});

mongoose.model("order", order, "orders");

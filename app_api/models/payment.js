const mongoose = require("mongoose");

const payment = mongoose.Schema({
  cardType: String,
  nameSurname: { type: String, required: true },
  cardNumber: { type: String, required: true },
});

mongoose.model("payment", payment, "payments");

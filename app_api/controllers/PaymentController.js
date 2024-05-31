var mongoose = require("mongoose");
var Payment = mongoose.model("payment");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const addPayment = async (req, res) => {
  const { cardType, nameSurname, cardNumber } = req.body;
  const payment = new Payment();
  payment.cardType = cardType;
  payment.nameSurname = nameSurname;
  payment.cardNumber = cardNumber;

  try {
    payment.save().then(() =>
      createResponse(res, 201, {
        status: "success",
        message: "Ödeme onaylandı!",
      })
    );
  } catch (error) {
    createResponse(res, 500, { status: "error", message: "Sunucu hatası!" });
  }
};

module.exports = {
  addPayment,
};

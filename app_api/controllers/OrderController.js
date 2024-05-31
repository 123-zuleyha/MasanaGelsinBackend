var mongoose = require("mongoose");
var Order = mongoose.model("order");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const createOrder = async (req, res) => {
  const { username, deskNumber, note, foods } = req.body;
  const order = new Order();
  order.username = username;
  order.deskNumber = deskNumber;
  order.note = note;
  order.foods = foods;

  try {
    order.save().then(() =>
      createResponse(res, 201, {
        status: "success",
        message: "Sipariş onaylandı!",
      })
    );
  } catch (error) {
    createResponse(res, 500, { status: "error", message: "Sunucu hatası!" });
  }
};

module.exports = {
  createOrder,
};

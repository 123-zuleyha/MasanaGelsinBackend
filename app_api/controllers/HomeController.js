var mongoose = require("mongoose");
var Home = mongoose.model("home");
const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const getHomeValues = async (req, res) => {
  try {
    await Home.find()
      .exec()
      .then((data) => {
        createResponse(res, 200, { status: "success", data });
      });
  } catch (error) {
    createResponse(res, 500, { status: "error", message: "Sunucu hatası!" });
  }
};

const addHomeValue = async (req, res) => {
  const { karoselImageURLs, menuOfDay } = req.body;
  const home = new Home();
  home.karoselImageURLs = karoselImageURLs;
  home.menuOfDay = menuOfDay;
  try {
    home.save().then(() => {
      createResponse(res, 201, {
        status: "success",
        message: "Anasayfa verileri eklendi!",
      });
    });
  } catch (error) {
    createResponse(res, 500, { status: "error", message: "Sunucu hatası!" });
  }
};

module.exports = { getHomeValues, addHomeValue };

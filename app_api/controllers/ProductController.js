var mongoose = require("mongoose");
var Product = mongoose.model("product");
const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const addProduct = async function (req, res) {
  try {
    await Product.create(req.body).then((response) => {
      createResponse(res, 201, { status: "success", message: "Ürün eklendi!" });
    });
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Ürün ekleme başarısız",
    });
  }
};

const getProduct = async function (req, res) {
  const { productID } = req.params;
  try {
    await Product.findById(productID)
      .exec()
      .then((product) => {
        createResponse(res, 200, { status: "success", data: product });
      });
  } catch (error) {
    createResponse(res, 404, { status: "error", message: "Sunucu hatası!" });
  }
};

const getProductsByCategory = async function (req, res) {
  const { category } = req.query;
  try {
    await Product.find({ category })
      .exec()
      .then((products) => {
        createResponse(res, 200, { status: "success", data: products });
      });
  } catch (error) {
    createResponse(res, 404, {
      status: "error",
      message: "Sunucu hatası!",
    });
  }
};

const updateProduct = async function (req, res) {
  const { productID } = req.params;
  try {
    await Product.findByIdAndUpdate(productID, req.body, {
      returnDocument: "after",
    }).then((updatedProduct) => {
      createResponse(res, 200, {
        status: "success",
        data: updatedProduct,
      });
    });
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Güncelleme başarısız!",
    });
  }
};

const deleteProduct = async function (req, res) {
  const { productID } = req.params;
  try {
    await Product.findByIdAndDelete(productID, {
      returnDocument: "after",
    }).then((product) => {
      createResponse(res, 200, {
        status: "error",
        message: product.name + " silindi!",
      });
    });
  } catch (error) {
    createResponse(res, 404, {
      status: "error",
      message: "Ürün silinemedi!",
    });
  }
};

module.exports = {
  deleteProduct,
  updateProduct,
  getProduct,
  addProduct,
  getProductsByCategory,
};

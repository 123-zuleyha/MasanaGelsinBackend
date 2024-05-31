const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("user");

const createResponse = (res, status, content) => {
  res.status(status).json(content);
};

const register = async (req, res) => {
  if (!req.body.name || !req.body.password) {
    createResponse(res, 400, {
      status: "error",
      message: "Tüm alanlar gereklidir.",
    });
    return;
  }

  const { name, password } = req.body;

  const registeredUser = await User.findOne({ name });
  if (registeredUser) {
    createResponse(res, 400, {
      status: "error",
      message: "Kayıtlı kullanıcı!",
    });
    return;
  }

  const user = new User();
  user.name = name;
  user.setPassword(password);

  try {
    await user.save().then(() => {
      createResponse(res, 201, {
        status: "success",
        message: "Kullanıcı oluşturuldu!",
      });
    });
  } catch (error) {
    createResponse(res, 400, {
      status: "error",
      message: "Kayıt başarısız!",
    });
  }
};

const login = async (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    createResponse(res, 400, {
      status: "error",
      message: "Tüm alanlar gereklidir.",
    });
    return;
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      createResponse(res, 400, {
        status: "error",
        info,
      });
    } else if (!user) {
      createResponse(res, 400, {
        status: "error",
        ...info,
      });
    } else {
      const token = user.generateToken();
      createResponse(res, 200, {
        status: "success",
        id: user._id,
        token,
      });
    }
  })(req, res);
};

const getUser = async (req, res, callback) => {
  const { name } = req.auth;
  if (req.auth && name) {
    try {
      await User.findOne({ name }).then((user) => {
        callback(req, res, user.name);
      });
    } catch (error) {
      createResponse(res, 404, {
        status: "error",
        message: "Kullanıcı bulunamadı!",
      });
    }
  } else {
    createResponse(res, 400, {
      status: "error",
      message: "Token girilmedi!",
    });
  }
};

module.exports = {
  register,
  login,
  getUser,
};

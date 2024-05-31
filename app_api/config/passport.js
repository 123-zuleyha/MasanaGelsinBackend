const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("user");

passport.use(
  "local",
  new LocalStrategy(
    {
      usernameField: "name",
      passwordField: "password",
    },
    async (name, password, done) => {
      try {
        const user = await User.findOne({ name });
        if (!user) {
          return done(null, false, { message: "Kullanıcı bulunamadı." });
        }

        const isMatch = user.checkPassword(password);

        if (!isMatch) {
          return done(null, false, { message: "Yanlış şifre." });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

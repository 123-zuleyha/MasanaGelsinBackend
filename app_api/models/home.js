// karosel listesi
// günün menüsü

var mongoose = require("mongoose");

var menuOfDay = mongoose.Schema({
  imageURL: String,
  description: String,
});

var home = mongoose.Schema({
  karoselImageURLs: [String],
  menuOfDay: menuOfDay,
});

mongoose.model("home", home, "homes");

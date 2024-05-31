var mongoose = require("mongoose");

var comment = mongoose.Schema({
  nameSurname: { type: String, required: true },
  comment: { type: String, required: true },
  start: { type: Number, default: 1 },
  date: { type: Date, default: new Date() },
});

mongoose.model("comment", comment, "comments");

var mongoose = require("mongoose");
var Comment = mongoose.model("comment");

const createResponse = function (res, status, content) {
  res.status(status).json(content);
};

const getAllComments = async function (req, res) {
  try {
    await Comment.find()
      .exec()
      .then(function (comment) {
        if (!comment) {
          createResponse(res, 404, {
            status: "error",
            message: "Yorum bulunamadı",
          });
          return;
        }
        createResponse(res, 200, {
          status: "success",
          data: comment,
        });
      });
  } catch (error) {
    createResponse(res, 404, {
      status: "venueid bulunamadı.",
    });
  }
};

const addComment = async function (req, res) {
  try {
    const { nameSurname, comment, start } = req.body;
    var newComment = new Comment();
    newComment.nameSurname = nameSurname;
    newComment.comment = comment;
    newComment.start = start;

    await newComment.save().then(() => {
      createResponse(res, 201, {
        status: "success",
        message: "Yorum oluşturuldu!",
      });
    });
  } catch (error) {
    createResponse(res, 400, { status: "Yorum ekleme başarısız" });
  }
};

module.exports = {
  getAllComments,
  addComment,
};

const { multipleMongoObj } = require("../../../util/mongoose");
const { mongoToObj } = require("../../../util/mongoose");
const Post = require("../../models/Blog");
const postPending = require("../../models/PostPending");
const CommentModel = require("../../models/Comment");
const adminPermission = false;
let userPermission = {};
class BlogController {
  // [GET] /
  homepage(req, res, next) {
    console.log(req.url);
    var query = require("url").parse(req.url, true).query;
    console.log(query.userpermission);
    console.log(query.userid);

    //queryUserData

    userPermission = new UserPermission(
      query.userpermission,
      "00001",
      "username123-" + query.userpermission
    );
    //userPermission.userName='username123';

    if (userPermission.permission == "admin")
      res.redirect(
        "/forum/admin/homepage?id=" +
          userPermission.userId +
          "&username=" +
          userPermission.userName
      );
    else if (userPermission.permission == "customer")
      res.redirect(
        "/forum/customer/homepage?id=" +
          userPermission.userId +
          "&username=" +
          userPermission.userName
      );
  }
}

module.exports = new BlogController();

class UserPermission {
  constructor(power, id, name) {
    this.permission = power;
    this.userId = id;
    this.userName = name;
  }
}

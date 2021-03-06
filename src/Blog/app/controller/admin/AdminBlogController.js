const Post = require("../../models/Blog");
const postPending = require("../../models/PostPending");
const { multipleMongoObj } = require("../../../util/mongoose");
const { mongoToObj } = require("../../../util/mongoose");
const CommentModel = require("../../models/Comment");
var cookieParser = require("cookie-parser");
const { debug } = require("console");

function ajaxcmt(request, response, callback, Id) {
  if (request.method == "POST") {
    let dataCmt = {};
    let savePost = {};
    let newPostData = {};
    let body = "";
    request.on("data", function (data) {
      body += data;
      var post = JSON.parse(body);
      console.log("body: " + body);
      dataCmt = post;
      callback(post);

      if (body.length > 1e6) request.connection.destroy();
    });

    request.on("end", function () {
      Post.findOne({ postID: Id }).then((posts) => {
        savePost = posts;
        mongoToObj(savePost);

        CommentModel.find({ postID: Id }).then((cmt) => {
          cmt = multipleMongoObj(cmt);
          newPostData = {
            username: savePost.username,
            caption: savePost.caption,
            image: savePost.image,
            Cmts: cmt,
            postID: savePost.postID,
            allowToCmT: savePost.availableToCmt,
          };

          const stringPost = JSON.stringify(newPostData);
          response.write(stringPost);
          response.end();
        });
      });

      response.writeHead(200, { "Content-Type": "application/json" });
    });
  }
}

function ajaxpending(request, response, callback, query) {
  if (request.method == "POST") {
    let body = "";
    request.on("data", function (data) {
      body += data;
      var data = JSON.parse(body);
      callback(data.id);

      if (body.length > 1e6) request.connection.destroy();
    });

    request.on("end", function () {
      const stringPost = JSON.stringify(query);
      response.write(stringPost);
      response.end();
    });
    response.writeHead(200, { "Content-Type": "application/json" });
  }
}

class AdminBlogController {
  constructor(id, username) {
    this.id = id;
    this.username = username;
  }
  homepage(req, res, next) {
    //let query = require("url").parse(req.url, true).query;
    let cookieName = req.cookies;

    let savePosts = [];
    let arrPosts = [];
    Post.find({})
      .then((posts) => {
        savePosts = multipleMongoObj(posts);
      })
      .then(
        CommentModel.find({})
          .then((cmt) => {
            cmt = multipleMongoObj(cmt);
            savePosts.forEach((element) => {
              const cmts = [];
              let createdDate = element.createdAt;
              let date = new Date(createdDate.toString());
              let getDay =
                date.getDate().toString() +
                "-" +
                (date.getMonth() + 1).toString() +
                "-" +
                date.getFullYear().toString();
              cmt.forEach((id) => {
                if (id.postID == element.postID) cmts.push(id);
              });
              arrPosts.push({
                username: element.username,
                caption: element.caption,
                title: element.title,
                image: element.image,
                arrCmt: cmts,
                postID: element.postID,
                allowToCmT: element.availableToCmt,
                postDate: getDay,
              });
            });
          })
          .then((tmp) => {
            res.render("templates/admin/forumadmin", {
              Posts: arrPosts,
              adminName: cookieName.oreo,
              adminId: cookieName.oreo,
            });
          })
      )
      .catch(next);
  }

  Comment(req, res, next) {
    ajaxcmt(
      req,
      res,
      function (cap) {
        if (cap.caption.length > 0) {
          const cmt = new CommentModel();
          cmt.postID = req.params.slug;
          // cmt.commentID = req.params.slug;
          cmt.caption = cap.caption;
          cmt.username = cap.username;
          cmt.save();
        }
      },
      req.params.slug
    );
  }

  LockComment(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    Post.findOne({ postID: query.idPost }).then((value) => {
      value = mongoToObj(value);
      if (value != null) {
        Post.updateOne(
          { postID: query.idPost },
          { $set: { availableToCmt: false } }
        ).then(res.redirect("/forum/admin/editpost?idPost=" + query.idPost));
      } else {
        res.redirect("/forum/admin/editpost?idPost=" + query.idPost);
      }
    });
  }

  ShowPending(req, res, next) {
    postPending
      .find({})
      .then((pending) => {
        res.render("templates/admin/admin", {
          pending: multipleMongoObj(pending),
          adminName: req.cookies.oreo,
          adminId: req.cookies.oreo,
        });
      })
      .catch(next);
  }

  EditPost(req, res, next) {
    console.log(req.body);
    let query = require("url").parse(req.url, true).query;
    if (req.body.caption.length <= 0 && req.body.image.length <= 0) {
      res.redirect("/forum/deletepost");
    } else {
      if (req.file) {
        Post.updateOne(
          { postID: query.idPost },
          {
            $set: {
              caption: req.body.caption,
              title: req.body.title,
              image: "/uploads/" + req.file.originalname,
            },
          }
        ).then((tmp) => res.redirect("/forum/admin/homepage"));
      } else {
        {
          Post.updateOne(
            { postID: query.idPost },
            { $set: { caption: req.body.caption, title: req.body.title } }
          ).then((tmp) => res.redirect("/forum/admin/homepage"));
        }
      }
    }
  }

  DeleteComment(req, res, next) {
    var query = require("url").parse(req.url, true).query;

    CommentModel.findOne({ _id: query.idCmt }).then((value) => {
      value = mongoToObj(value);
      console.log(value);
      if (value != null) {
        CommentModel.deleteOne({ _id: query.idCmt }).then((tmp) =>
          res.redirect("/forum/admin/editpost?idPost=" + value.postID)
        );
      } else {
        res.redirect("/forum/admin/editpost?idPost=" + value.postID);
      }
    });
  }

  ShowEditForm(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    // console.log(query.idPost);
    Post.findOne({ postID: query.idPost })
      .then((posts) => {
        posts = mongoToObj(posts);
        if (posts != null) {
          CommentModel.find({ postID: query.idPost }).then((arrCmt) => {
            res.render("templates/admin/adminedit", {
              username: posts.username,
              caption: posts.caption,
              title: posts.title,
              image: posts.image,
              cmts: multipleMongoObj(arrCmt),
              postID: posts.postID,
              isAdmin: true,
              allowToCmT: posts.availableToCmt,
            });
          });
        } else {
          res.redirect("/forum/admin/homepage");
        }
      })
      .catch(next);
  }

  DeletePendingPost(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    ajaxpending(
      req,
      res,
      function (val) {
        postPending.findOne({ postID: val }).then((value) => {
          value = mongoToObj(value);
          if (value != null) {
            postPending
              .deleteOne({ postID: val })
              .then((result) => {
                // res.redirect('/forum/admin/pending?id=' + query.id + "&username=" + query.username)
              })
              .catch(next);
          } else {
            //  res.redirect('/forum/admin/pending?id=' + query.id + "&username=" + query.username)
          }
        });
      },
      query
    );
  }

  DeletePost(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    Post.findOne({ postID: query.idPost }).then((value) => {
      value = mongoToObj(value);
      if (value != null) {
        CommentModel.deleteMany({ postID: query.idPost }).then((cmt) => {
          Post.deleteOne({ postID: query.idPost }).then((tmp) =>
            res.redirect("/forum/admin/homepage")
          );
        });
      } else {
        res.redirect("/forum/admin/homepage");
      }
    });
  }

  StorePost(req, res, next) {
    //let query = require("url").parse(req.url, true).query;

    if (req.body.caption.length > 0) {
      const savePost = new Post();
      const postID = req.cookies.oreo.toString() + Math.random().toString();
      savePost.username = req.cookies.oreo;
      savePost.caption = req.body.caption;
      savePost.postID = postID;
      savePost.title = req.body.title;

      if (req.file) savePost.image = "/uploads/" + req.file.originalname;

      savePost.availableToCmt = true;
      savePost.save().then(res.redirect("/forum/admin/homepage"));     
    } else res.redirect("/forum/admin/homepage");
  }

  OpenComment(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    Post.findOne({ postID: query.idPost }).then((value) => {
      value = mongoToObj(value);
      if (value != null) {
        Post.updateOne(
          { postID: query.idPost },
          { $set: { availableToCmt: true } }
        ).then(res.redirect("/forum/admin/editpost?idPost=" + query.idPost));
      } else {
        res.redirect("/forum/admin/editpost?idPost=" + query.idPost);
      }
    });
  }

  WriteNewPost(req, res, next) {
    const isAdmin = true;
    // let query = require("url").parse(req.url, true).query;
    res.render("templates/admin/writenewpost", {
      isAdmin,
      adminName: req.cookies.oreo,
      adminId: req.cookies.oreo,
    });
  }

  ConfirmPost(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    ajaxpending(
      req,
      res,
      function (val) {
        postPending
          .findOne({ postID: val })
          .then((value) => {
            value = mongoToObj(value);
            if (value != null) {
              const savePost = new Post();
              savePost.username = value.username;
              savePost.caption = value.caption;
              savePost.postID = value.postID;
              savePost.title = value.title;
              savePost.image = value.image;
              savePost.idAuthor = value.idAuthor;
              savePost.availableToCmt = true;
              savePost.save();
            }
          })
          .catch(next);

        postPending.deleteOne({ postID: val }).catch(next);
      },
      query
    );
  }
}

module.exports = new AdminBlogController();

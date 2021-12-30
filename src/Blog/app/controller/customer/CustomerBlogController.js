const { multipleMongoObj } = require("../../../util/mongoose");
const CommentModel = require("../../models/Comment");
const blog = require("../../models/Blog");
const postPending = require("../../models/PostPending");
const Customer = require("../../../../Customer/app/models/Customer");
const { mongoToObj } = require("../../../util/mongoose");
function ajaxcmt(request, response, callback, Id) {
  if (request.method == "POST") {
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
      blog.findOne({ postID: Id }).then((posts) => {
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
class CustomerBlogController {
  homepage(req, res, next) {
    //let query = require("url").parse(req.url, true).query;
    let userId = req.cookies.customer;

    let savePosts = [];
    let arrPosts = [];
    Customer.findOne({_id: userId})
    .then(customers =>{
      let customer_name = customers.username;
      let customer_Id = customers._id;
      blog
      .find({})
      .then((posts) => {
        savePosts = multipleMongoObj(posts);
      })
      .then(
        CommentModel.find({})
          .then((cmt) => {
            cmt = multipleMongoObj(cmt);
            savePosts.forEach((element) => {
              const cmts = [];
              let author = false;
              let createdDate = element.createdAt;
              let date = new Date(createdDate.toString());
              let getDay = date.getDate().toString()+ "-" + (date.getMonth()+1).toString() +"-" +  date.getFullYear().toString()
              if(element.idAuthor==userId)
              author=true;
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
                isAuthor: author,
                // customerName: customer_name,
                // customerId: customer_Id,
                postDate: getDay
              });
            });
          })
          .then((tmp) => {
            res.render("templates/store/forumcustomer", {
              Posts: arrPosts,
              isAdmin: false,
              customerName: customer_name,
              customerId: customer_Id,
            });
          })
      )
      .catch(next);
    })
    .catch(next);
  }

  OpenComment(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    blog.findOne({ postID: query.idPost }).then((value) => {
      value = mongoToObj(value);
      if (value != null) {
        blog
          .updateOne(
            { postID: query.idPost },
            { $set: { availableToCmt: true } }
          )
          .then(
            res.redirect(
              "/forum/customer/editpost?idPost=" +
                query.idPost
            )
          );
      } else {
        res.redirect(
          "/forum/customer/editpost?idPost=" +
            query.idPost
        );
      }
    });
  }

  ShowEditForm(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    let cookies=req.cookies; 

    blog.findOne({ postID: query.idPost }).then((posts) => {
      posts = mongoToObj(posts);
      if (posts != null) {
        CommentModel.find({ postID: query.idPost }).then((arrCmt) => {
          res.render("templates/store/customeredit", {
            username: posts.username,
            caption: posts.caption,
            image: posts.image,
            cmts: multipleMongoObj(arrCmt),
            postID: posts.postID,
            allowToCmT: posts.availableToCmt,
            customerName: cookies.usernameName,
            idCustomer: cookies.customer,
          });
        });
      } else {
        res.redirect("/forum/customer/homepage");
      }
    });
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

  EditPost(req, res, next) {
    console.log(req.file)
    let query = require('url').parse(req.url, true).query;
    if (req.body.caption.length <= 0) {
        res.redirect('/forum/customer/deletepost');
    }
    else {
        if (req.file) {
            blog.updateOne({ postID: query.idPost }, { $set: { caption: req.body.caption, image: '/uploads/' + req.file.originalname } },)
                .then(tmp => res.redirect('/forum/customer/homepage'))
        }
        else {
            blog.updateOne({ postID: query.idPost }, { $set: { caption: req.body.caption } },)
                .then(tmp => res.redirect('/forum/customer/homepage'))
        }
    }
  }

  DeletePost(req, res, next) {
    let query = require('url').parse(req.url, true).query;
        blog.findOne({ postID: query.idPost })
            .then(value => {
                value = mongoToObj(value);
                if (value != null) {
                    CommentModel.deleteMany({ postID: query.idPost })
                        .then(cmt => {
                            blog.deleteOne({ postID: query.idPost })
                                .then(tmp => res.redirect('/forum/customer/homepage'))
                        })
                }
                else { res.redirect('/forum/customer/homepage') }
            })
  }

  WriteNewPost(req, res, next) {
    const isAdmin = false;
   // let query = require("url").parse(req.url, true).query;
   let cookies= req.cookies;
   Customer.findOne({_id: cookies.customer})
   .then(customers =>{
     let customer_name = customers.username;
     let customer_Id = customers._id;
     res.render("templates/store/writenewpost", {
       isAdmin,
       customerName: customer_name,
       customerId: customer_Id,
     });
   })
  }

  DeleteComment(req, res, next) {
    var query = require("url").parse(req.url, true).query;

    CommentModel.findOne({ _id: query.idCmt }).then((value) => {
      if (value != null) {
        value = mongoToObj(value);
        console.log(value);
        CommentModel.deleteOne({ _id: query.idCmt }).then((tmp) =>
          res.redirect(
            "/forum/customer/editpost?idPost=" +
              value.postID
          )
        );
      } else {
        res.redirect(
          "/forum/customer/editpost?idPost=" +
            value.postID
        );
      }
    });
  }

  LockComment(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    blog.findOne({ postID: query.idPost }).then((value) => {
      value = mongoToObj(value);
      if (value != null) {
        blog
          .updateOne(
            { postID: query.idPost },
            { $set: { availableToCmt: false } }
          )
          .then(
            res.redirect(
              "/forum/customer/editpost?idPost=" +
                query.idPost
            )
          );
      } else {
        res.redirect(
          "/forum/customer/editpost?idPost=" +
            query.idPost
        );
      }
    });
  }

  StorePost(req, res, next) {
    let query = require("url").parse(req.url, true).query;
    let cookies= req.cookies;
    Customer.findOne({_id: cookies.customer})
    .then(customers =>{
    let customer_name = customers.username;
    let customer_Id = customers._id;

    const postData = req.body;
    const postID = customer_name.toString() + Math.random().toString();
    postData.postID = postID;
    const savePost = new postPending(postData);
    savePost.idAuthor=customer_Id;
    savePost.username=customer_name;
    if(req.file)       
    savePost.image = '/uploads/' + req.file.originalname;
    savePost.save();
    res.redirect(
      "/forum/customer/homepage"
    );
  })
  }
}

module.exports = new CustomerBlogController();

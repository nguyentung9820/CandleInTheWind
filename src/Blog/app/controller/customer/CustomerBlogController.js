const { multipleMongoObj } = require('../../../util/mongoose');
const CommentModel = require("../../models/Comment");
const blog = require("../../models/Blog");
const postPending = require("../../models/PostPending");
const { mongoToObj } = require("../../../util/mongoose");
function r(request, response, callback, Id) {
    if (request.method == 'POST') {
        let savePost = {};
        let newPostData = {};
        let body = '';
        request.on('data', function (data) {
            body += data;
            var post = JSON.parse(body);
            console.log("body: " + body);
            dataCmt = post;
            callback(post);

            if (body.length > 1e6)
                request.connection.destroy();

        });

        request.on('end', function () {

            blog.findOne({ postID: Id })
                .then(posts => {
                    savePost = posts
                    mongoToObj(savePost)

                    CommentModel.find({ postID: Id })
                        .then(cmt => {
                            cmt = multipleMongoObj(cmt)
                            newPostData =
                            {
                                username: savePost.username,
                                caption: savePost.caption,
                                image: savePost.image,
                                Cmts: cmt,
                                postID: savePost.postID,
                                allowToCmT: savePost.availableToCmt,
                            }
                            // console.log("newPostData: " +newPostData);  

                            // console.log("newPostData caption: " +newPostData.caption);  

                            // newPostData.Cmts.forEach(element => {
                            //     console.log("cmt : " +element.caption);  
                            // });

                            const stringPost = JSON.stringify(newPostData);
                            response.write(stringPost);
                            response.end();
                        })
                })

            response.writeHead(200, { 'Content-Type': 'application/json' });
        });

    }
}
class CustomerBlogController {

    homepage(req, res, next) {
        var query = require('url').parse(req.url, true).query;
        //  console.log(query.id);
        //  console.log(query.username);

        let savePosts = []
        let arrPosts = []
        blog.find({})
            .then(posts => {
                savePosts = multipleMongoObj(posts)
            })
            .then(
                CommentModel.find({})
                    .then(cmt => {
                        cmt = multipleMongoObj(cmt)
                        savePosts.forEach(element => {
                            const cmts = []
                            const randomBoolean = Math.random() < 0.5;
                            cmt.forEach(id => {
                                if (id.postID == element.postID)
                                    cmts.push(id)
                            })
                            arrPosts.push({
                                username: element.username,
                                caption: element.caption,
                                image: element.image,
                                arrCmt: cmts,
                                postID: element.postID,
                                allowToCmT: element.availableToCmt,
                                isAuthor: randomBoolean,
                            })
                        });
                    })
                    .then(tmp => {
                        res.render("templates/store/forumcustomer", { Posts: arrPosts, isAdmin: false, customerName: query.username })
                    })
            )
            .catch(next)
    }

    OpenComment(req, res, next) {
        blog.updateOne({ postID: req.params.slug }, { $set: { availableToCmt: true } })
            .then(
                res.redirect('/forum/customer/edit/' + req.params.slug)
            )
    }

    ShowEditForm(req, res, next) {
        blog.findOne({ postID: req.params.slug })
            .then(posts => {
                posts = mongoToObj(posts);
                if (posts != null) {
                    CommentModel.find({ postID: req.params.slug })
                    .then(arrCmt => {
                        res.render('templates/store/customeredit', {
                            username: posts.username,
                            caption: posts.caption,
                            image: posts.image,
                            cmts: multipleMongoObj(arrCmt),
                            postID: posts.postID,
                            allowToCmT: posts.availableToCmt
                        })
                    })
                }
                else {
                    res.redirect('/forum/customer/homepage')
                }
            })
    }

    Comment(req, res, next) {
        r(req, res, function (cap) {
            if (cap.caption.length > 0) {
                const cmt = new CommentModel();
                cmt.postID = req.params.slug;
                cmt.commentID = req.params.slug;
                cmt.caption = cap.caption;
                cmt.username = cap.username;
                cmt.save();
            }
        }, req.params.slug)
    }

    EditPost(req, res, next) {
        if (req.query.caption.length <= 0 && req.query.image.length <= 0) {
            res.redirect('/forum/deletepost/' + req.params.slug);
        }
        else {
            blog.updateOne({ postID: req.params.slug }, { $set: { username: req.query.username, caption: req.query.caption, image: req.query.image } },)
                .then(tmp => res.redirect('/forum/customer/homepage'))
        }
    }

    DeletePost(req, res, next) {
        blog.findOne({ postID: req.params.slug })
            .then(value => {
                value = mongoToObj(value);
                if (value != null) {
                    CommentModel.deleteMany({ postID: req.params.slug })
                        .then(cmt => {
                            blog.deleteOne({ postID: req.params.slug })
                                .then(tmp => res.redirect('/forum/customer/homepage'))
                        })
                }
                else { res.redirect('/forum/customer/homepage') }
            })
    }

    WriteNewPost(req, res, next) {
        const isAdmin = false;
        res.render('templates/store/writenewpost', { isAdmin })
    }

    DeleteComment(req, res, next) {
        var query = require('url').parse(req.url, true).query;
        console.log(query.idCmt);
        console.log(query.idPost);

        CommentModel.findOne({ _id: req.params.slug })
            .then(value => {
                if (value != null) {
                    value = mongoToObj(value);
                    console.log(value);
                    CommentModel.deleteOne({ _id: req.params.slug })
                        .then(tmp => res.redirect('/forum/customer/edit/' + value.postID))
                }
                else {
                    res.redirect('/forum/admin/edit/' + query.idPost)
                }
            })
    }

    LockComment(req, res, next) {
        blog.updateOne({ postID: req.params.slug }, { $set: { availableToCmt: false } })
            .then(
                res.redirect('/forum/customer/edit/' + req.params.slug)
            )
    }

    StorePost(req, res, next) {
        const postID = req.body.username + Math.random().toString();
        const postData = req.body;
        postData.postID = postID;
        const savePost = new postPending(postData);
        savePost.save();
        res.redirect('/forum/customer/homepage');
    }
}



module.exports = new CustomerBlogController;
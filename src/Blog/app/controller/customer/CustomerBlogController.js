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
        let query = require('url').parse(req.url, true).query;

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
                                customerName: query.username,
                                customerId: query.id
                            })
                        });
                    })
                    .then(tmp => {
                        res.render("templates/store/forumcustomer", { Posts: arrPosts, isAdmin: false, customerName: query.username,customerId: query.id })
                    })
            )
            .catch(next)
    }

    OpenComment(req, res, next) {
        let query = require('url').parse(req.url, true).query;
        blog.findOne({ postID: query.idPost })
        .then(value =>{
            value = mongoToObj(value)
            if(value!=null)
            {blog.updateOne({ postID: query.idPost }, { $set: { availableToCmt: true } })
                .then(
                    res.redirect('/forum/customer/editpost?idPost=' + query.idPost+"&username="+query.username+"&customerId="+query.customerId)
                )
            }
            else {
                res.redirect('/forum/customer/editpost?idPost=' + query.idPost+"&username="+query.username+"&customerId="+query.customerId)
            }
        })
    }

    ShowEditForm(req, res, next) {
        let query = require('url').parse(req.url, true).query;
        blog.findOne({ postID: query.idPost })
            .then(posts => {
                posts = mongoToObj(posts);
                if (posts != null) {
                    CommentModel.find({ postID: query.idPost })
                    .then(arrCmt => {
                        res.render('templates/store/customeredit', {
                            username: posts.username,
                            caption: posts.caption,
                            image: posts.image,
                            cmts: multipleMongoObj(arrCmt),
                            postID: posts.postID,
                            allowToCmT: posts.availableToCmt,
                            customerName: query.username,
                            idCustomer: query.customerId
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
        let query = require('url').parse(req.url, true).query;
        if (req.body.caption.length <= 0 && req.body.image.length <= 0) {
            res.redirect('/forum/deletepost/' + req.params.slug);
        }
        else {
            blog.updateOne({ postID: req.params.slug }, { $set: { username: req.query.username, caption: req.query.caption, image: req.query.image } },)
                .then(tmp => res.redirect('/forum/customer/homepage?id='+query.customerId+"&username="+query.username))
        }
    }

    DeletePost(req, res, next) {
        let query = require('url').parse(req.url, true).query;
        blog.findOne({ postID: req.params.slug })
            .then(value => {
                value = mongoToObj(value);
                if (value != null) {
                    CommentModel.deleteMany({ postID: req.params.slug })
                        .then(cmt => {
                            blog.deleteOne({ postID: req.params.slug })
                                .then(tmp => res.redirect('/forum/customer/homepage?id='+query.adminId+"&username="+query.username))
                        })
                }
                else { res.redirect('/forum/customer/homepage?id='+query.adminId+"&username="+query.username) }
            })
    }

    WriteNewPost(req, res, next) {
        const isAdmin = false;
        let query = require('url').parse(req.url, true).query;
        res.render('templates/store/writenewpost', { isAdmin, customerName: query.username,customerId: query.id })
    }

    DeleteComment(req, res, next) {
        var query = require('url').parse(req.url, true).query;

        CommentModel.findOne({ _id: query.idCmt })
            .then(value => {
                if (value != null) {
                    value = mongoToObj(value);
                    console.log(value);
                    CommentModel.deleteOne({ _id: query.idCmt })
                        .then(tmp => res.redirect('/forum/customer/editpost?idPost=' + value.postID+"&username="+query.username+"&customerId="+query.customerId))
                }
                else {
                    res.redirect('/forum/customer/editpost?idPost=' + value.postID+"&username="+query.username+"&customerId="+query.customerId)
                }
            })
    }

    LockComment(req, res, next) {
        let query = require('url').parse(req.url, true).query;
        blog.findOne({ postID: query.idPost })
        .then(value =>{
            value = mongoToObj(value)
            if(value!=null)
            {blog.updateOne({ postID: query.idPost }, { $set: { availableToCmt: false } })
                .then(
                    res.redirect('/forum/customer/editpost?idPost=' + query.idPost+"&username="+query.username+"&customerId="+query.customerId)
                )
            }
            else {
                res.redirect('/forum/customer/editpost?idPost=' + query.idPost+"&username="+query.username+"&customerId="+query.customerId)
            }
        })
    }

    StorePost(req, res, next) {
        let query = require('url').parse(req.url, true).query;
        const postID = req.body.username + Math.random().toString();
        const postData = req.body;
        postData.postID = postID;
        const savePost = new postPending(postData);
        savePost.save();
        res.redirect('/forum/customer/homepage?id='+query.id+"&username="+query.username);
    }
}



module.exports = new CustomerBlogController;
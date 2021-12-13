// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const Post = require("../../models/Blog");
const app = require('express')();
const http = require('http');
const postPending = require("../../models/PostPending");
const { multipleMongoObj } = require('../../../util/mongoose');
const { mongoToObj } = require('../../../util/mongoose');
const CommentModel = require("../../models/Comment");
const { response } = require("express");
let dataCmt = {};
let adminData = {
    adminId: '',
    adminName: ''
}
let adminHomepageURL='';

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

            Post.findOne({ postID: Id })
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
class AdminBlogController {
    constructor(id,username){
        this.id=id;
        this.username=username;
    }
    homepage(req, res, next) {
        let query = require('url').parse(req.url, true).query;

        let savePosts = []
        let arrPosts = []
        Post.find({})
            .then(posts => {
                savePosts = multipleMongoObj(posts)
            })
            .then(
                CommentModel.find({})
                    .then(cmt => {
                        cmt = multipleMongoObj(cmt)
                        savePosts.forEach(element => {
                            const cmts = []
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
                            })
                        });
                    })
                    .then(tmp => {
                        res.render("templates/admin/forumadmin", { Posts: arrPosts, adminName: query.username, adminId: query.id })
                    })
            )
            .catch(next)
    }

    Comment(req, res, next) {
        r(req, res, function (cap) {
            if(cap.caption.length>0)
            {
            const cmt = new CommentModel();
            cmt.postID = req.params.slug;
            cmt.commentID = req.params.slug;
            cmt.caption = cap.caption;
            cmt.username = cap.username;
            cmt.save();
            }
        }, req.params.slug)
    }



    LockComment(req, res, next) {
        Post.updateOne({ postID: req.params.slug }, { $set: { availableToCmt: false } })
            .then(
                res.redirect('/forum/admin/edit/' + req.params.slug)
            )
    }

    ShowPending(req, res, next) {
        postPending.find({})
            .then(pending => res.render('templates/admin/admin', { pending: multipleMongoObj(pending) }))
            .catch(next)
    }

    EditPost(req, res, next) {
        if (req.body.caption.length <= 0 && req.body.image.length <= 0) {
            res.redirect('/forum/deletepost/' + req.params.slug);
        }
        else {
            Post.updateOne({ postID: req.params.slug }, { $set: { username: req.body.username, caption: req.body.caption, image: req.body.image } },)
                .then(tmp => res.redirect('/forum/admin/homepage'))
        }
    }

    DeleteComment(req, res, next) {
        var query = require('url').parse(req.url, true).query;
        console.log(query.idCmt);
        console.log(query.idPost);

        CommentModel.findOne({ _id: query.idCmt })
            .then(value => {
                value = mongoToObj(value);
                console.log(value);
                if (value != null) {
                    CommentModel.deleteOne({ _id: query.idCmt })
                        .then(tmp => res.redirect('/forum/admin/edit/' + value.postID))
                }
                else {
                    res.redirect('/forum/admin/edit/' + query.idPost)
                }
            })
    }

    ShowEditForm(req, res, next) {
        Post.findOne({ postID: req.params.slug })
            .then(posts => {
                posts = mongoToObj(posts);
                if(posts!=null){
                CommentModel.find({ postID: req.params.slug })
                    .then(arrCmt => {
                        res.render('templates/admin/adminedit', {
                            username: posts.username,
                            caption: posts.caption,
                            image: posts.image,
                            cmts: multipleMongoObj(arrCmt),
                            postID: posts.postID,
                            isAdmin: true,
                            allowToCmT: posts.availableToCmt
                        })
                    })
                }
                else{
                    res.redirect('/forum/admin/homepage')
                }
            })
            .catch(next)
    }

    DeletePendingPost(req, res, next) {
        postPending.findOne({ postID: req.params.slug })
            .then(value => {
                value = mongoToObj(value);
                if (value != null) {
                    postPending.deleteOne({ postID: req.params.slug })
                        .then(result => {
                            res.redirect('/forum/admin/pending')
                        })
                        .catch(next)
                }
                else {
                    res.redirect('/forum/admin/pending')
                }
            })
    }

    DeletePost(req, res, next) {
        Post.findOne({ postID: req.params.slug })
            .then(value => {
                value = mongoToObj(value);
                if (value != null) {
                    CommentModel.deleteMany({ postID: req.params.slug })
                        .then(cmt => {
                            Post.deleteOne({ postID: req.params.slug })
                                .then(tmp => res.redirect(adminHomepageURL))
                        })
                }
                else { res.redirect('/forum/admin/homepage') }
            })
    }

    StorePost(req, res, next) {
        const savePost = new Post();
        const postID = req.body.username + Math.random().toString();
        savePost.username = req.body.username;
        savePost.caption = req.body.caption;
        savePost.postID = postID;
        savePost.image = req.body.image;
        savePost.availableToCmt = true;
        savePost.save();
        res.redirect('/forum/admin/homepage');
    }

    OpenComment(req, res, next) {
        Post.findOne({ postID: req.params.slug })
        .then(value =>{
            value = mongoToObj(value)
            if(value!=null)
            {Post.updateOne({ postID: req.params.slug }, { $set: { availableToCmt: true } })
                .then(
                    res.redirect('/forum/admin/edit/' + req.params.slug)
                )
            }
            else {
                res.redirect('/forum/admin/homepage');
            }
        })
    }

    WriteNewPost(req, res, next) {
        const isAdmin = true;
        res.render('templates/admin/writenewpost', { isAdmin })
    }

    ConfirmPost(req, res, next) {
        postPending.findOne({ postID: req.params.slug })
            .then(value => {
                const savePost = new Post();
                savePost.username = value.username;
                savePost.caption = value.caption;
                savePost.postID = value.postID;
                savePost.image = value.image;
                savePost.availableToCmt = true;

                savePost.save();
            })
            .catch(next)

        postPending.deleteOne({ postID: req.params.slug })
            .then(value => res.redirect('/forum/admin/pending'))
            .catch(next)

    }

}

module.exports = new AdminBlogController;


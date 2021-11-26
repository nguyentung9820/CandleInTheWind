const { multipleMongoObj } = require('../../../util/mongoose');
const { mongoToObj } = require('../../../util/mongoose');
const Post = require("../../models/Blog")
const postPending = require("../../models/PostPending");
const CommentModel = require("../../models/Comment")
const adminPermission=false;
class BlogController {
    // [GET] /
    homepage(req,res,next)
    {   
        let savePosts = []
        let arrPosts= []
        Post.find({})
        .then(posts =>
        {        
            savePosts= multipleMongoObj(posts)                  
        })
        .then( 
            CommentModel.find({})
             .then(cmt => {
            cmt = multipleMongoObj(cmt)
            savePosts.forEach(element => {
                const cmts = []
                const randomBoolean = Math.random() < 0.5;
                cmt.forEach(id =>
                    {
                        if(id.postID==element.postID)
                        cmts.push(id.caption)
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
        .then(tmp=> {      
         res.render("templates/blog/blog",{Posts: arrPosts, isAdmin: adminPermission})
        })
        )
        .catch(next)
    }

    // StorePost(req,res,next)
    // {
    //     const postID= req.body.username + Math.random().toString();
    //     if(req.params.slug != 'true')
    //     {  
    //     const postData = req.body;
    //     postData.postID = postID;
    //     const savePost = new postPending(postData);
    //     savePost.save();
    //    }
    //    else 
    //    {
    //     const savePost = new Post();
    //     savePost.username = req.body.username;
    //     savePost.caption = req.body.caption;
    //     savePost.postID = postID;
    //     savePost.image = req.body.image;
    //     savePost.availableToCmt = true;       
    //     savePost.save();                  
    //    }
       
    //     res.redirect('/forum');
    // }

    // Comment(req,res,next)
    // {        
    //     if(req.body.comment.length>0)
    //     {
    //     const cmt = new CommentModel();
    //     cmt.postID = req.params.slug;
    //     cmt.commentID = req.params.slug;
    //     cmt.caption = req.body.comment;
    //     cmt.save();
    //     }
    //     res.redirect('/forum/customer/homepage');
    // }

    // WriteNewPost(req,res,next)
    // {
    //     const isAdmin=adminPermission;
    //     res.render('templates/blog/writenewpost',{isAdmin})
    // }
    
    // LockComment(req,res,next)
    // {
    //     Post.updateOne({postID: req.params.slug},{$set:{availableToCmt: false}})
    //     .then(
    //         res.redirect('/forum')         
    //     )
    // }

    // OpenComment(req,res,next)
    // {
    //     Post.updateOne({postID: req.params.slug},{$set:{availableToCmt: true}})
    //     .then(
    //         res.redirect('/forum')         
    //     )
    // }

    // DeleteComment(req,res,next)
    // {
    //     CommentModel.deleteOne({postID: req.params.slug})
    //     .then(res.redirect('/forum'))
    // }

    // EditPost(req,res,next)
    // {
    //     Post.findOne({postID: req.params.slug})
    //     .then(posts => 
    //     { 
    //         posts = mongoToObj(posts);
    //         CommentModel.find({postID: req.params.slug})
    //         .then(arrCmt => {            
    //             res.render('templates/blog/edit',{
    //                 username: posts.username,
    //                 caption: posts.caption,
    //                 image: posts.image,
    //                 cmts: multipleMongoObj(arrCmt),
    //                 postID: posts.postID,
    //                 isAdmin: adminPermission,
    //                 allowToCmT: posts.availableToCmt})            
    //         })           
    //     })
    // }

    // DeletePost(req,res,next)
    // {
    //     CommentModel.deleteMany({postID: req.params.slug})
    //     .then(cmt => {
    //         Post.deleteOne({postID: req.params.slug})
    //         .then(tmp => res.redirect('/forum'))
            
    //     })      
    // }
}

module.exports = new BlogController;
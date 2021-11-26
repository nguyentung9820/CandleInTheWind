// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const Post = require("../../models/Blog")
const postPending = require("../../models/PostPending")
const { multipleMongoObj } = require('../../../util/mongoose');
const { mongoToObj } = require('../../../util/mongoose');
const CommentModel = require("../../models/Comment")
class AdminBlogController {

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
                })
            });
        })
        .then(tmp=> {      
         res.render("templates/admin/forumadmin",{Posts: arrPosts, isAdmin: true})
        })
        )
        .catch(next)
    }

    Comment(req,res,next)
    {        
        if(req.body.comment.length>0)
        {
        const cmt = new CommentModel();
        cmt.postID = req.params.slug;
        cmt.commentID = req.params.slug;
        cmt.caption = req.body.comment;
        cmt.save();
        }
        res.redirect('/forum/admin/homepage');
    }

    LockComment(req,res,next)
    {
        Post.updateOne({postID: req.params.slug},{$set:{availableToCmt: false}})
        .then(
            res.redirect('/forum/admin/edit/'+req.params.slug)         
        )
    }

    ShowPending(req,res,next)
    {
        postPending.find({})
        .then(pending =>res.render('templates/admin/admin',{pending: multipleMongoObj(pending)}))
        .catch(next)      
    }

    EditPost(req,res,next)
    {
        if(req.query.caption.length<=0 && req.query.image.length<=0)
        {
            res.redirect('/forum/deletepost/'+ req.params.slug);
        }
        else{
            Post.updateOne({postID: req.params.slug},{ $set: { username: req.query.username,caption: req.query.caption, image: req.query.image} },)
            .then(tmp => res.redirect('/forum/admin/homepage'))
        }
    }

    ShowEditForm(req,res,next)
    {
        Post.findOne({postID: req.params.slug})
        .then(posts => 
        { 
            posts = mongoToObj(posts);
            CommentModel.find({postID: req.params.slug})
            .then(arrCmt => {            
                res.render('templates/admin/adminedit',{
                    username: posts.username,
                    caption: posts.caption,
                    image: posts.image,
                    cmts: multipleMongoObj(arrCmt),
                    postID: posts.postID,
                    isAdmin: true,
                    allowToCmT: posts.availableToCmt})            
            })           
        })
    }

    DeletePost(req,res,next)
    {
        postPending.deleteOne({postID: req.params.slug})
        .then(result => {           
            res.redirect('/forum/admin/homepage')})
        .catch(next)
    }

    StorePost(req,res,next)
    {
        const savePost = new Post();
        const postID= req.body.username + Math.random().toString();
        savePost.username = req.body.username;
        savePost.caption = req.body.caption;
        savePost.postID = postID;
        savePost.image = req.body.image;
        savePost.availableToCmt = true;       
        savePost.save();    
        res.redirect('/forum/admin/homepage');              
    }

    OpenComment(req,res,next)
    {
        Post.updateOne({postID: req.params.slug},{$set:{availableToCmt: true}})
        .then(
            res.redirect('/forum/admin/edit/' + req.params.slug)         
        )
    }

    WriteNewPost(req,res,next)
    {
        const isAdmin=true;
        res.render('templates/admin/writenewpost',{isAdmin})
    }

    ConfirmPost(req,res,next)
    {   
        postPending.findOne({postID: req.params.slug})
        .then(value =>   
       {
        const savePost = new Post();
        savePost.username = value.username;
        savePost.caption = value.caption;
        savePost.postID = value.postID;
        savePost.image = value.image;
        savePost.availableToCmt = true;
        
        savePost.save();                  
        }) 
        .catch(next)

        postPending.deleteOne({postID: req.params.slug})
        .then(value=> res.redirect('/forum/admin/homepage'))
        .catch(next)
     
    }

}



module.exports = new AdminBlogController;
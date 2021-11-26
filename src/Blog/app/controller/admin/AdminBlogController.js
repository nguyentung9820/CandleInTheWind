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

    ShowPending(req,res,next)
    {
        postPending.find({})
        .then(pending =>res.render('templates/admin/admin',{pending: multipleMongoObj(pending)}))
        .catch(next)      
    }

    ShowEditForm(req,res,next)
    {
        blog.findOne({postID: req.params.slug})
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
                    isAdmin: adminPermission,
                    allowToCmT: posts.availableToCmt})            
            })           
        })
    }

    DeletePost(req,res,next)
    {
        postPending.deleteOne({postID: req.params.slug})
        .then(result => {           
            res.redirect('/forum/admin')})
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
        const savePost = new Blog();
        savePost.username = value.username;
        savePost.caption = value.caption;
        savePost.postID = value.postID;
        savePost.image = value.image;
        savePost.availableToCmt = true;
        
        savePost.save();                  
        }) 
        .catch(next)

        postPending.deleteOne({postID: req.params.slug})
        .then(value=> res.redirect('/forum/admin'))
        .catch(next)
     
    }

}



module.exports = new AdminBlogController;
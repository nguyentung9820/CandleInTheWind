const { multipleMongoObj } = require('../../../util/mongoose');
const CommentModel = require("../../models/Comment");
const blog = require("../../models/Blog");
const postPending = require("../../models/PostPending");
const { mongoToObj } = require("../../../util/mongoose");
class CustomerBlogController {

    homepage(req,res,next)
    {   
        let savePosts = []
        let arrPosts= []
        blog.find({})
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
         res.render("templates/store/forumcustomer",{Posts: arrPosts, isAdmin: false})
        })
        )
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
                res.render('templates/store/customeredit',{
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

    EditPost(req,res,next)
    {
        if(req.query.caption.length<=0 && req.query.image.length<=0)
        {
            res.redirect('/forum/deletepost/'+ req.params.slug);
        }
        else{
            blog.updateOne({postID: req.params.slug},{ $set: { username: req.query.username,caption: req.query.caption, image: req.query.image} },)
            .then(tmp => res.redirect('/forum'))
        }
    }

    WriteNewPost(req,res,next)
    {
        const isAdmin=false;
        res.render('templates/store/writenewpost',{isAdmin})
    }

    DeleteComment(req,res,next)
    {
        CommentModel.findOne({_id: req.params.slug})
        .then(value => {
            value = mongoToObj(value);
            console.log(value);
             CommentModel.deleteOne({_id: req.params.slug})
            .then(tmp=> res.redirect('/forum/edit/' + value.postID))
        })
    }

    StorePost(req,res,next)
    {
        const postID= req.body.username + Math.random().toString();
        const postData = req.body;
        postData.postID = postID;
        const savePost = new postPending(postData);
        savePost.save();
        res.redirect('/forum/customer/homepage');
    }
}



module.exports = new CustomerBlogController;
const { multipleMongoObj } = require('../../../util/mongoose');
const { mongoToObj } = require('../../../util/mongoose');
const Post = require("../../models/Blog")

const CommentModel = require("../../models/Comment")
class BlogController {

    // [GET] /
    homepage(req,res,next)
    {
        let savePosts = []
        let saveCmts= []
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
                    allowToCmT: element.availableToCmt
                })
            });
        })
        .then(tmp=> {      
         res.render("templates/blog/blog",{arrPosts})
     // res.json(arrPosts)
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
        res.redirect('/forum');
    }

    LockComment(req,res,next)
    {
        Post.updateOne({postID: req.params.slug},{$set:{availableToCmt: false}})
        .then(
            res.redirect('/forum')         
        )
    }

    OpenComment(req,res,next)
    {
        Post.updateOne({postID: req.params.slug},{$set:{availableToCmt: true}})
        .then(
            res.redirect('/forum')         
        )
    }

    DeleteComment(req,res,next)
    {
        CommentModel.deleteOne({postID: req.params.slug})
        .then(res.redirect('/forum'))
    }

    EditPost(req,res,next)
    {
        Post.findOne({postID: req.params.slug})
        .then(posts => 
        { 
            posts = mongoToObj(posts);
            CommentModel.find({postID: req.params.slug})
            .then(arrCmt => {            
                res.render('templates/store/edit',{
                    username: posts.username,
                    caption: posts.caption,
                    image: posts.image,
                    cmts: multipleMongoObj(arrCmt),
                    postID: posts.postID,
                    allowToCmT: posts.availableToCmt})            
            })           
        })
    }

    DeletePost(req,res,next)
    {
        CommentModel.deleteMany({postID: req.params.slug})
        .then(cmt => {
            Post.deleteOne({postID: req.params.slug})
        })      
    }
}

module.exports = new BlogController;
const { multipleMongoObj } = require('../../../util/mongoose');
const Post = require("../../models/Blog")
const CommentModel = require("../../models/Comment")
class BlogController {

    // [GET] /
    homepage(req,res,next)
    {
        let savePosts
        let saveCmts
        savePosts= Post.find({})
        .then(posts =>
        {        
            posts= multipleMongoObj(posts) 
            
                   
        })
        .then(console.log(savePosts))
        .catch(next)

        saveCmts=CommentModel.find({})
        .then(cmt => {
            cmt = multipleMongoObj(cmt)
        })

    }
     

    Comment(req,res,next)
    {        
        const cmt = new CommentModel();
        cmt.postID = req.params.slug;
        cmt.caption = req.body.comment;
        cmt.save();
        //res.redirect('/forum');
        res.json(cmt)

    }
}



module.exports = new BlogController;
const { multipleMongoObj } = require('../../../util/mongoose');
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
                    caption: element.caption,
                    arrCmt: cmts
                })
            });
        })
        .then(tmp=> {      
         res.render("templates/blog/blog",{arrPosts})
         console.log(arrPosts);   
        })
        )
        .catch(next)


       

        // Post.find({})
        // .then((posts) => {
        //   let elementsArr = [];
        //   let cmtsArr = [];
        //   let postArr = [];
      
        //   posts = multipleMongoObj(posts);
        //   posts.forEach((element) => {
        //     CommentModel.find({ postID: element.postID }).then((cmts) => {
        //       elementsArr.push(element.caption);
        //       cmtsArr.push(cmts);
        //     });
        //   });
      
        //   res.render("templates/blog/blog",  {
        //     elements: elementsArr, //! mảng chứa các elements đã lấy trong forEach
        //     cmt: cmtsArr, //! mảng chứa các cmt đã lấy trong forEach
        //     post: postArr, //! chứa post
        //   });
        // })
        // .catch(next);

    }
     
    ListPost(post,cmt)
    {

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

class ArrayPost{
    caption
    cmt = new Array()
}

module.exports = new BlogController;
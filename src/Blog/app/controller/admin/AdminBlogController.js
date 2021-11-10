// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const Blog = require("../../models/Blog")
const postPending = require("../../models/PostPending")
const { multipleMongoObj } = require('../../../util/mongoose');
const { mongoToObj } = require('../../../util/mongoose');
class AdminBlogController {
    // [GET] /
    homepage(req,res,next)
    {
        postPending.find({})
        .then(pending =>res.render('templates/admin/admin',{pending: multipleMongoObj(pending)}))
        .catch(next)
        
    }

    DeletePost(req,res,next)
    {
        postPending.deleteOne({postID: req.params.slug})
        .then(result => {           
            res.redirect('/forum/admin')})
        .catch(next)
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
        
        console.log(savePost);
        savePost.save();                  
        })
        .catch(next)

        postPending.deleteOne({postID: req.params.slug})
        .then(value=> res.redirect('/forum/admin'))
        .catch(next)
     
    }

}



module.exports = new AdminBlogController;
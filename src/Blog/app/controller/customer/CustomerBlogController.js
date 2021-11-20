// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const CommentModel = require("../../models/Comment")
const blog = require("../../models/Blog")
const postPending = require("../../models/PostPending");
const { mongoToObj } = require("../../../util/mongoose");
class CustomerBlogController {

    // [GET] /
    homepage(req,res,next)
    {
        blog.find({})
        .then(query=> res.render('templates/store/customer',query))
        .catch(next)
      //  ;
    }
    //[POST] /forum/customer/storepost
    StorePost(req,res,next)
    {
        const postData = req.body;
        postData.postID= postData.username + Math.random().toString();
        const savePost = new postPending(postData);
        savePost.save();
        res.redirect('/');
    }

    EditPost(req,res,next)
    {
        console.log(req.query);
        blog.updateOne({postID: req.params.slug},{ $set: { username: req.query.username,caption: req.query.caption, image: req.query.image} },)
        .then(tmp => res.redirect('/forum'))
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
}



module.exports = new CustomerBlogController;
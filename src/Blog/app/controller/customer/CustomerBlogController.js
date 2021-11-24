// const { mutipleMongooseToObject } = require('../../../util/mongoose')
const CommentModel = require("../../models/Comment");
const blog = require("../../models/Blog");
const AdminBlogController = require("../../controller/admin/AdminBlogController");
const { mongoToObj } = require("../../../util/mongoose");
class CustomerBlogController {

    //[POST] /forum/customer/storepost

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
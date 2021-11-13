// const { mutipleMongooseToObject } = require('../../../util/mongoose')

const blog = require("../../models/Blog")
const postPending = require("../../models/PostPending")
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


}



module.exports = new CustomerBlogController;
const { multipleMongoObj } = require('../../../util/mongoose');
const { mongoToObj } = require('../../../util/mongoose');
const Post = require("../../models/Blog")
const postPending = require("../../models/PostPending");
const CommentModel = require("../../models/Comment")
const adminPermission=false;
let userPermission= {};
class BlogController {
    // [GET] /
    homepage(req,res,next)
    {   
        // let savePosts = []
        // let arrPosts= []
        // Post.find({})
        // .then(posts =>
        // {        
        //     savePosts= multipleMongoObj(posts)                  
        // })
        // .then( 
        //     CommentModel.find({})
        //      .then(cmt => {
        //     cmt = multipleMongoObj(cmt)
        //     savePosts.forEach(element => {
        //         const cmts = []
        //         const randomBoolean = Math.random() < 0.5;
        //         cmt.forEach(id =>
        //             {
        //                 if(id.postID==element.postID)
        //                 cmts.push(id.caption)
        //             })
        //         arrPosts.push({
        //             username: element.username,
        //             caption: element.caption,
        //             image: element.image,
        //             arrCmt: cmts,
        //             postID: element.postID,
        //             allowToCmT: element.availableToCmt,
        //             isAuthor: randomBoolean,
        //         })
        //     });
        // })
        // .then(tmp=> {      
        //     if(userPermission.userPermission==1)
        //      res.render("templates/admin/forumadmin",{Posts: arrPosts, isAdmin: adminPermission})
        // })
        // )
        // .catch(next)
        userPermission=new UserPermission(1);

        if(userPermission.userPermission==1)
        res.redirect("/forum/admin/homepage")
        else 
        res.redirect("/forum/customer/homepage")
    }
}

module.exports = new BlogController;

class UserPermission
{
    constructor(permission)
    {
        this.userPermission = permission;
    }
}
const express = require('express');
const router = express.Router();
//TEST image
var multer  = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/Blog/resources/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
//

const adminBlogController = require('../../app/controller/admin/AdminBlogController');
const customerBlogController = require('../../app/controller/customer/CustomerBlogController');
const blogController = require('../../app/controller/blog/BlogController');
const authMiddleware = require('../../middlewares/middleware');

router.post('/profile-upload-single', upload.single('profile-file'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="/uploads/${req.file.originalname}" /><br>`
    return res.send(response)
  })
//Admin - Pending Post
router.post('/admin/pending/delete', adminBlogController.DeletePendingPost);
router.post('/admin/pending/store', adminBlogController.ConfirmPost);
router.get('/admin/pending', adminBlogController.ShowPending);
//Admin - Manage Post
router.get('/admin/editpost', adminBlogController.ShowEditForm);
router.post('/admin/edit/store',upload.single('profile-file'), adminBlogController.EditPost);
router.get('/admin/newpost', adminBlogController.WriteNewPost);
router.post('/admin/deletepost', adminBlogController.DeletePost);
router.post('/admin/store',upload.single('profile-file'), adminBlogController.StorePost);
//Admin - Manage Comment
router.post('/admin/comment/:slug', adminBlogController.Comment);
router.get('/admin/lockcomment', adminBlogController.LockComment);
router.get('/admin/opencomment', adminBlogController.OpenComment);
router.get('/admin/deletecomment', adminBlogController.DeleteComment);

router.get('/admin/homepage', adminBlogController.homepage);

//--------------------------------------------------------------------------
//Customer - Manage Post
router.get('/customer/editpost', customerBlogController.ShowEditForm);
router.post('/customer/edit/store', customerBlogController.EditPost);
router.get('/customer/newpost', customerBlogController.WriteNewPost);
router.post('/customer/deletepost', customerBlogController.DeletePost);
router.post('/customer/store', customerBlogController.StorePost);
//Customer - Manage Comment
router.post('/customer/comment/:slug', customerBlogController.Comment);
router.get('/customer/lockcomment', customerBlogController.LockComment);
router.get('/customer/opencomment', customerBlogController.OpenComment);
router.get('/customer/deletecomment', customerBlogController.DeleteComment);

router.get('/customer/homepage', customerBlogController.homepage);

router.get('/', blogController.homepage);

module.exports = router;
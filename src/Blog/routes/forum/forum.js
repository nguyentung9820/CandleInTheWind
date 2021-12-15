const express = require('express');
const router = express.Router();

const adminBlogController = require('../../app/controller/admin/AdminBlogController');
const customerBlogController = require('../../app/controller/customer/CustomerBlogController');
const blogController = require('../../app/controller/blog/BlogController');
const authMiddleware = require('../../middlewares/middleware');

//Admin - Pending Post
router.post('/admin/pending/delete', adminBlogController.DeletePendingPost);
router.post('/admin/pending/store', adminBlogController.ConfirmPost);
router.get('/admin/pending', adminBlogController.ShowPending);
//Admin - Manage Post
router.get('/admin/editpost', adminBlogController.ShowEditForm);
router.post('/admin/edit/store', adminBlogController.EditPost);
router.get('/admin/newpost', adminBlogController.WriteNewPost);
router.post('/admin/deletepost', adminBlogController.DeletePost);
router.post('/admin/store', adminBlogController.StorePost);
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
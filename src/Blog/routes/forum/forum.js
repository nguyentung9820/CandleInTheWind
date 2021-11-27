const express = require('express');
const router = express.Router();

const adminBlogController = require('../../app/controller/admin/AdminBlogController');
const customerBlogController = require('../../app/controller/customer/CustomerBlogController');
const blogController = require('../../app/controller/blog/BlogController');
const authMiddleware = require('../../middlewares/middleware');

//Admin - Pending Post
router.get('/admin/pending/delete/:slug', adminBlogController.DeletePendingPost);
router.get('/admin/pending/store/:slug', adminBlogController.ConfirmPost);
router.get('/admin/pending', adminBlogController.ShowPending);
//Admin - Manage Post
router.get('/admin/edit/:slug', adminBlogController.ShowEditForm);
router.get('/admin/edit/store/:slug', adminBlogController.EditPost);
router.get('/admin/newpost', adminBlogController.WriteNewPost);
router.get('/admin/deletepost/:slug', adminBlogController.DeletePost);
router.post('/admin/store', adminBlogController.StorePost);
//Admin - Manage Comment
router.post('/admin/comment/:slug', adminBlogController.Comment);
router.get('/admin/lockcomment/:slug', adminBlogController.LockComment);
router.get('/admin/opencomment/:slug', adminBlogController.OpenComment);
router.get('/admin/deletecomment/:slug', adminBlogController.DeleteComment);

router.get('/admin/homepage', adminBlogController.homepage);

//--------------------------------------------------------------------------
//Customer - Manage Post
router.get('/customer/edit/:slug', customerBlogController.ShowEditForm);
router.get('/customer/edit/store/:slug', customerBlogController.EditPost);
router.get('/customer/deletepost/:slug', customerBlogController.DeletePost);
router.get('/customer/newpost', customerBlogController.WriteNewPost);
router.post('/customer/store', customerBlogController.StorePost);
//Customer - Manage Comment
router.get('/customer/deletecomment/:slug', customerBlogController.DeleteComment);
router.post('/customer/comment/:slug', customerBlogController.Comment);
router.get('/customer/lockcomment/:slug', customerBlogController.LockComment);
router.get('/customer/opencomment/:slug', customerBlogController.OpenComment);

router.get('/customer/homepage', customerBlogController.homepage);

router.get('/', blogController.homepage);

module.exports = router;
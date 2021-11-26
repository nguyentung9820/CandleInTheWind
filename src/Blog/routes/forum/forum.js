const express = require('express');
const router = express.Router();

const adminBlogController = require('../../app/controller/admin/AdminBlogController');
const customerBlogController = require('../../app/controller/customer/CustomerBlogController');
const blogController = require('../../app/controller/blog/BlogController');
const authMiddleware = require('../../middlewares/middleware');
const Blog = require('../../app/models/Blog');

router.get('/admin/delete/:slug', adminBlogController.DeletePost);
router.get('/admin/store/:slug', adminBlogController.ConfirmPost);

router.get('/admin/edit/:slug', adminBlogController.ShowEditForm);
router.get('/admin/edit/store/:slug', adminBlogController.EditPost);
router.get('/admin/newpost', adminBlogController.WriteNewPost);
router.post('/admin/store', adminBlogController.StorePost);
router.post('/admin/comment/:slug', adminBlogController.Comment);
router.get('/admin/lockcomment/:slug', adminBlogController.LockComment);
router.get('/admin/opencomment/:slug', adminBlogController.OpenComment);
router.get('/admin/pending', adminBlogController.ShowPending);
router.get('/admin/homepage', adminBlogController.homepage);

router.get('/customer/edit/:slug', customerBlogController.ShowEditForm);
router.get('/customer/edit/store/:slug', customerBlogController.EditPost);
router.get('/customer/newpost', customerBlogController.WriteNewPost);
router.post('/customer/store', customerBlogController.StorePost);
router.get('/customer/deletecomment/:slug', customerBlogController.DeleteComment);
router.post('/customer/comment/:slug', customerBlogController.Comment);
router.get('/customer/lockcomment/:slug', customerBlogController.LockComment);
router.get('/customer/opencomment/:slug', customerBlogController.OpenComment);
router.get('/customer/homepage', customerBlogController.homepage);

router.get('/', blogController.homepage);

module.exports = router;
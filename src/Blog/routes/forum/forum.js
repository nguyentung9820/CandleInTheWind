const express = require('express');
const router = express.Router();

const adminBlogController = require('../../app/controller/admin/AdminBlogController');
const customerBlogController = require('../../app/controller/customer/CustomerBlogController');
const blogController = require('../../app/controller/blog/BlogController');
const authMiddleware = require('../../middlewares/middleware');

router.get('/admin/delete/:slug', adminBlogController.DeletePost);
router.get('/admin/store/:slug', adminBlogController.ConfirmPost);
router.get('/admin', adminBlogController.homepage);

router.post('/comment/:slug',blogController.Comment)
router.get('/lockcomment/:slug',blogController.LockComment)
router.get('/opencomment/:slug',blogController.OpenComment)

router.get('/customer/store', customerBlogController.StorePost);
router.get('/customer/edit/:slug', customerBlogController.EditPost);
router.get('/customer/deletecomment/:slug', customerBlogController.DeleteComment);
router.get('/delete/:slug', blogController.DeletePost);
router.get('/edit/:slug', blogController.EditPost);

router.get('/customer', customerBlogController.homepage);
router.get('/', blogController.homepage);

module.exports = router;
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

router.post('/customer/store', customerBlogController.StorePost);
router.get('/customer', customerBlogController.homepage);
router.get('/', blogController.homepage);

module.exports = router;
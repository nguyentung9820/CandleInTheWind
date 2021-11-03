const express = require('express');
const router = express.Router();

const adminBlogController = require('../../app/controller/admin/AdminBlogController');
const customerBlogController = require('../../app/controller/customer/CustomerBlogController');
const authMiddleware = require('../../middlewares/middleware');

router.get('/admin', adminBlogController.homepage);
router.get('/customer', customerBlogController.homepage);

module.exports = router;
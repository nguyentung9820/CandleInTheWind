const express = require('express');
const router = express.Router();

const customerController = require('../../app/controller/store/CustomerController');
const adminController = require('../../app/controller/admin/AdminController');
const authMiddleware = require('../../middlewares/middleware');

router.get('/admin/logout',authMiddleware.checkAdmin, adminController.logout);
router.get('/', customerController.customer);
router.get('/admin', adminController.admin);
router.post('/admin', adminController.login);

module.exports = router;
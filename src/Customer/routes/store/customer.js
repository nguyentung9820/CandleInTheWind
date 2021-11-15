const express = require('express');
const router = express.Router();

const customerController = require('../../app/controller/store/CustomerController');
const adminController = require('../../app/controller/admin/AdminController');
const authMiddleware = require('../../middlewares/middleware');

router.post('/admin',adminController.login);

router.get('/admin/logout',authMiddleware.checkAdmin, adminController.logout);
router.get('/admin',authMiddleware.checkLogin, adminController.admin);
router.get('/', customerController.customer);

module.exports = router;
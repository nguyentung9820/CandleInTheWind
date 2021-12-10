const express = require('express');
const router = express.Router();

const customerController = require('../../app/controller/admin/CustomerController');
const authMiddleware = require('../../middlewares/middleware');
const upload = require('../../multer')

router.post('/customer/update/:id',authMiddleware.checkAdmin,upload.single('avatar'), customerController.updateCustomer);
router.get('/customer/edit/:id',authMiddleware.checkAdmin, customerController.editCustomer);
router.get('/customer/view/:id',authMiddleware.checkAdmin, customerController.viewCustomer);
router.post('/customer/save',authMiddleware.checkAdmin, upload.single('avatar'), customerController.saveCustomer);
router.get('/customer/add',authMiddleware.checkAdmin, customerController.addCustomer);
router.get('/customer',authMiddleware.checkAdmin, customerController.customer);

module.exports = router;
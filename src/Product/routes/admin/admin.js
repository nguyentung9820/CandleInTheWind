const express = require('express');
const router = express.Router();
const adminController = require('../../app/controller/admin/AdminController');
const upload = require('../../multer')
const authMiddleware = require('../../middlewares/middleware');

router.get('/product/edit/:id', authMiddleware.checkAdmin, adminController.editProduct)
router.get('/product/delete/:id', authMiddleware.checkAdmin, adminController.deleteProduct)
router.post('/product/save',authMiddleware.checkAdmin, upload.single('product_image'), adminController.save)
router.get('/product/add',authMiddleware.checkAdmin, adminController.add);
router.get('/product',authMiddleware.checkAdmin, adminController.product);

module.exports = router;
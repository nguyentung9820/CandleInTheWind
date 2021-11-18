const express = require('express');
const router = express.Router();
const adminController = require('../../app/controller/admin/AdminController');
const categoryController = require('../../app/controller/admin/CategoryController');

const upload = require('../../multer')
const authMiddleware = require('../../middlewares/middleware');

router.get('/product/edit/:id', authMiddleware.checkAdmin, adminController.editProduct)
router.get('/product/delete/:id', authMiddleware.checkAdmin, adminController.deleteProduct)
router.post('/product/save',authMiddleware.checkAdmin, upload.single('product_image'), adminController.save)
router.get('/product/add',authMiddleware.checkAdmin, adminController.add);
router.get('/product',authMiddleware.checkAdmin, adminController.product);

router.get('/category/add', categoryController.add);
router.post('/category/save', upload.single('category_image'), categoryController.save)
router.get('/category', categoryController.category);

module.exports = router;
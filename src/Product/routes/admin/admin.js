const express = require('express');
const router = express.Router();
const productController = require('../../app/controller/admin/ProductController');
const categoryController = require('../../app/controller/admin/CategoryController');
const attributeController = require('../../app/controller/admin/AttributeController');

const upload = require('../../multer')
const authMiddleware = require('../../middlewares/middleware');

router.post('/product/update/:id', authMiddleware.checkAdmin, upload.single('product_image'), productController.update)
router.get('/product/edit/:id', authMiddleware.checkAdmin, productController.editProduct)
router.get('/product/delete/:id', authMiddleware.checkAdmin, productController.deleteProduct)
router.post('/product/save',authMiddleware.checkAdmin, upload.single('product_image'), productController.save)
router.get('/product/add',authMiddleware.checkAdmin, productController.add);
router.get('/product',authMiddleware.checkAdmin, productController.product);

router.post('/category/update/:id', authMiddleware.checkAdmin, upload.single('category_image'), categoryController.update)
router.get('/category/edit/:id', authMiddleware.checkAdmin, categoryController.editCategory);
router.get('/category/detele/:id', authMiddleware.checkAdmin, categoryController.deleteCategory);
router.get('/category/add', authMiddleware.checkAdmin, categoryController.add);
router.post('/category/save', authMiddleware.checkAdmin, upload.single('category_image'), categoryController.save)
router.get('/category',authMiddleware.checkAdmin, categoryController.category);

router.get('/childcategory/delete/:id', authMiddleware.checkAdmin, categoryController.deleteChild);
router.post('/childcategory/save', authMiddleware.checkAdmin, categoryController.saveChild)
router.get('/childcategory/:id',authMiddleware.checkAdmin, categoryController.childCategory);
router.get('/childcategory/:id/add',authMiddleware.checkAdmin, categoryController.addchild);

router.post('/attributeset/update/:id', authMiddleware.checkAdmin, upload.single('attributeset_image'), attributeController.updateAttributeSet)
router.get('/attributeset/edit/:id', authMiddleware.checkAdmin, attributeController.editAttributeSet);
router.get('/attributeset/detele/:id', authMiddleware.checkAdmin, attributeController.deleteAttributeSet);
router.get('/attributeset/add', authMiddleware.checkAdmin, attributeController.addAttributeSet);
router.post('/attributeset/save', authMiddleware.checkAdmin, upload.single('attributeset_image'), attributeController.saveAttributeSet)
router.get('/attributeset',authMiddleware.checkAdmin, attributeController.attributeSet);

router.get('/attribute/delete/:id', authMiddleware.checkAdmin, attributeController.deleteAttribute);
router.post('/attribute/save', authMiddleware.checkAdmin, attributeController.saveAttribute)
router.get('/attribute/:id',authMiddleware.checkAdmin, attributeController.attribute);
router.get('/attribute/:id/add',authMiddleware.checkAdmin, attributeController.addAttribute);
module.exports = router;
const express = require('express');
const router = express.Router();
const productController = require('../../app/controller/admin/ProductController');
const categoryController = require('../../app/controller/admin/CategoryController');
const promotionController = require('../../app/controller/admin/PromotionController')

const upload = require('../../multer')
const authMiddleware = require('../../middlewares/middleware');

router.post('/product/update/:id', authMiddleware.checkAdmin, upload.single('product_image'), productController.update)
router.get('/product/edit/:id', authMiddleware.checkAdmin, productController.editProduct)
router.get('/product/delete/:id', authMiddleware.checkAdmin, productController.deleteProduct)
router.post('/product/save',authMiddleware.checkAdmin, upload.single('product_image'), productController.save)
router.get('/product/add',authMiddleware.checkAdmin, productController.add);
router.get('/product',authMiddleware.checkAdmin, productController.product);

router.post('/promotion/update/:id', authMiddleware.checkAdmin, promotionController.update)
router.get('/promotion/getByProductId/:id', authMiddleware.checkAdmin, promotionController.getByProductId)
router.get('/promotion/edit/:id', authMiddleware.checkAdmin, promotionController.editPromotion)
router.get('/promotion/delete/:id', authMiddleware.checkAdmin, promotionController.deletePromotion)
router.post('/promotion/save',authMiddleware.checkAdmin, promotionController.save)
router.get('/promotion/add',authMiddleware.checkAdmin, promotionController.add);
router.get('/promotion',authMiddleware.checkAdmin, promotionController.promotion);


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

module.exports = router;
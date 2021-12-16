const express = require('express');
const router = express.Router();
const promotionController = require('../../app/controller/admin/PromotionController')

const authMiddleware = require('../../middlewares/middleware');

router.post('/promotion/update/:id', authMiddleware.checkAdmin, promotionController.update)
router.get('/promotion/getDiscount/:code', promotionController.getDiscount)
router.get('/promotion/edit/:id', authMiddleware.checkAdmin, promotionController.editPromotion)
router.get('/promotion/delete/:id', authMiddleware.checkAdmin, promotionController.deletePromotion)
router.post('/promotion/save',authMiddleware.checkAdmin, promotionController.save)
router.get('/promotion/add',authMiddleware.checkAdmin, promotionController.add);
router.get('/promotion',authMiddleware.checkAdmin, promotionController.promotion);


module.exports = router;
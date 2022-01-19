const express = require('express');
const router = express.Router();
const promotionController = require('../../app/controller/admin/PromotionController')
const rankController = require('../../app/controller/admin/RankController')
const upload = require('../../multer')

const authMiddleware = require('../../middlewares/middleware');


router.get('/rank/view',authMiddleware.checkAdmin, rankController.rank);
router.get('/rank/add',authMiddleware.checkAdmin, rankController.addRank);
router.post('/rank/save',authMiddleware.checkAdmin, upload.single('rank_image'), rankController.saveRank);
router.get('/rank/delete/:id',authMiddleware.checkAdmin, rankController.delete);
router.post('/rank/update/:id',authMiddleware.checkAdmin,upload.single('rank_image'), rankController.update);
router.get('/rank/edit/:id',authMiddleware.checkAdmin, rankController.edit);

router.post('/promotion/update/:id', authMiddleware.checkAdmin, promotionController.update)
router.get('/promotion/getDiscount/:code', promotionController.getDiscount)
router.get('/promotion/edit/:id', authMiddleware.checkAdmin, promotionController.editPromotion)
router.get('/promotion/delete/:id', authMiddleware.checkAdmin, promotionController.deletePromotion)
router.post('/promotion/save',authMiddleware.checkAdmin, promotionController.save)
router.get('/promotion/add',authMiddleware.checkAdmin, promotionController.add);
router.get('/promotion',authMiddleware.checkAdmin, promotionController.promotion);


module.exports = router;
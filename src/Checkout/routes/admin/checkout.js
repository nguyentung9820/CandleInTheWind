const express = require('express');
const router = express.Router();

const checkoutController = require('../../app/controller/admin/CheckoutController');
const authMiddleware = require('../../middlewares/middleware');

router.get('/order/invoice/:id',authMiddleware.checkAdmin, checkoutController.invoice);
router.get('/order/ship/:id',authMiddleware.checkAdmin, checkoutController.shipOrder);
router.get('/order/cancel/:id',authMiddleware.checkAdmin, checkoutController.cancelOrder);
router.get('/order/delete/:id',authMiddleware.checkAdmin, checkoutController.deleteOrder);
router.get('/order/view/:id',authMiddleware.checkAdmin, checkoutController.viewOrder);
router.get('/order',authMiddleware.checkAdmin, checkoutController.order);

module.exports = router;
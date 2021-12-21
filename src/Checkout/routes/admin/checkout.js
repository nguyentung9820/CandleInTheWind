const express = require('express');
const router = express.Router();

const checkoutController = require('../../app/controller/admin/CheckoutController');

router.get('/order/delete/:id', checkoutController.deleteOrder);
router.get('/order/view/:id', checkoutController.viewOrder);
router.get('/order', checkoutController.order);

module.exports = router;
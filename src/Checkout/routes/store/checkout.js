const express = require('express');
const router = express.Router();

const checkoutController = require('../../app/controller/store/CheckoutController');

router.post('/payment/placeorder', checkoutController.placeOrder);
router.get('/payment', checkoutController.payment);

module.exports = router;
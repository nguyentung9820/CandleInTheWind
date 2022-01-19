const express = require('express');
const router = express.Router();

const orderController = require('../../app/controller/store/OrderController');

router.get('/invoice',orderController.invoice);
router.get('/cancel/:id',orderController.cancelOrder);
router.get('/view/:id',orderController.viewOrder);
router.get('/',orderController.order);

module.exports = router;
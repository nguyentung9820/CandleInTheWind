const express = require('express');
const router = express.Router();

const checkoutController = require('../../app/controller/admin/CheckoutController');
const authMiddleware = require('../../middlewares/middleware');

router.get('/',authMiddleware.checkAdmin, checkoutController.viewInvoices);

module.exports = router;
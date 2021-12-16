const express = require('express');
const router = express.Router();

const orderController = require('../../app/controller/store/OrderController');


router.get('/',orderController.order);
router.get('/view/:id',orderController.viewOrder);

module.exports = router;
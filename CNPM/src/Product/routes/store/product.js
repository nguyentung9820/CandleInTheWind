const express = require('express');
const router = express.Router();

const productController = require('../../app/controller/store/ProductController');


router.get('/:sku', productController.detail);


module.exports = router;
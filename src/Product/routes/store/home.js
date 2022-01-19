const express = require('express');
const router = express.Router();

const homeController = require('../../app/controller/store/HomeController');


router.get('/', homeController.home);
router.get('/category/:category', homeController.productPerCategory);


module.exports = router;
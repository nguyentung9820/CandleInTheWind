const express = require('express');
const router = express.Router();
const adminController = require('../../app/controller/admin/AdminController');
const upload = require('../../multer')
const authMiddleware = require('../../middlewares/middleware');


router.get('/',authMiddleware.checkAdmin, adminController.admin);

router.post('/save', upload.single('product_image'), adminController.save)

module.exports = router;
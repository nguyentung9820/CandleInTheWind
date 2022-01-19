const express = require('express');
const router = express.Router();

const accountControler = require('../../app/controller/store/AccountController');
const upload = require('../../multer')

router.post('/update/:id',upload.single('avatar'),accountControler.updateProfile);
router.get('/edit/:id',accountControler.editProfile);
router.get('/',accountControler.profile);

module.exports = router;
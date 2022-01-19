const express = require('express');
const router = express.Router();

const accountControler = require('../../app/controller/store/AccountController');


router.post('/',accountControler.signin);

module.exports = router;
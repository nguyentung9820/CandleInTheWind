const express = require('express');
const router = express.Router();

const accountControler = require('../../app/controller/store/AccountController');


router.get('/',accountControler.profile);

module.exports = router;
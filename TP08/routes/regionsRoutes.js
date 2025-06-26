const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regionsController.js');

router.post('/insert', regionsController.insert);

module.exports = router;
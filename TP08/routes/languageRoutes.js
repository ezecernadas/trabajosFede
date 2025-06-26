const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController.js');

router.post('/insert', languageController.insert);

module.exports = router;
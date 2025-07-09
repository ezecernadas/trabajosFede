const express = require('express');
const router = express.Router();
const countryLanguageController = require('../controllers/countryLanguageController.js');

router.post('/insert', countryLanguageController.insert);

module.exports = router;
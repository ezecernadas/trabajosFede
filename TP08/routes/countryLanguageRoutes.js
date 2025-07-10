const express = require('express');
const router = express.Router();
const countryLanguageController = require('../controllers/countryLanguageController.js');

router.get('/get/:country_id', countryLanguageController.getById);

router.post('/insert', countryLanguageController.insert);

router.post('/update/:country_id', countryLanguageController.update);

router.delete('/delete/:country_id', countryLanguageController.delete);

module.exports = router;
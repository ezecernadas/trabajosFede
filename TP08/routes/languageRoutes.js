const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController.js');

router.get('/get/all', languageController.getAll);
router.get('/get/all/count_countries', languageController.getAllWithCountriesOficialLanguage);
router.get('/get/all/languages_by_continent', languageController.getLanguagesByContinent);
router.post('/insert', languageController.insert);

module.exports = router;
const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController.js');

router.get('/get/all', countryController.getAll);
router.get('/get/all/language_and_regions', countryController.LanguageAndRegions);
router.get('/get/all/continent', countryController.Continent);
router.get('/get/all/regions', countryController.Regions);
router.get('/get/all/stats', countryController.stats);
router.get('/get/all/languages', countryController.languages);
router.get('/get/all/area', countryController.area);
router.get('/get/all/national_day', countryController.national_day);

router.post('/insert', countryController.insert);

router.post('/insert/language', countryController.insertLanguage);

router.delete('/delete/:idCountry/:year', countryController.deleteStats);
router.put('/update/:idCountry/:year', countryController.updateStats);

module.exports = router;
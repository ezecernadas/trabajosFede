const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController.js');

router.get('/get/all', countryController.getAll);
router.get('/get/all/language_and_regions', countryController.getAllWithLanguageAndRegions);
router.get('/get/all/continent', countryController.getAllWithContinent);
router.get('/get/all/regions', countryController.getAllWithRegions);
router.get('/get/all/stats', countryController.getAllWithStats);
router.get('/get/all/languages', countryController.getAllWithLanguages);
router.get('/get/all/area', countryController.getAllWithRegionAndArea);
router.get('/get/all/national_day', countryController.getAllWithNationalDay);

router.post('/insert', countryController.insert);

module.exports = router;
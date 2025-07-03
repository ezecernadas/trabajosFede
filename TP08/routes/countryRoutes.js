const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController.js');

router.get('/getAll', countryController.getCountry);
router.get('/getAllWithRegion', countryController.getCountriesWithRegion);
router.get('/getAllWithContinent', countryController.getCountriesWithContinent);

router.post('/insert', countryController.insert);

router.post('/insertLanguage', countryController.insertLanguage);

router.delete('/delete/:idCountry/:year', countryController.deleteStats);
router.put('/update/:idCountry/:year', countryController.updateStats);

module.exports = router;
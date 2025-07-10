const express = require('express');
const router = express.Router();
const countryStatsController = require('../controllers/countryStatsController.js');

router.get('/get/:country_id/:year', countryStatsController.getById);

router.post('/insert', countryStatsController.insert);

router.put('/update/:country_id/:year', countryStatsController.update);

router.delete('/delete/:country_id/:year', countryStatsController.delete);

module.exports = router;
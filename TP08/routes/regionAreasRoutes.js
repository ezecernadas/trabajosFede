const express = require('express');
const router = express.Router();
const regionAreasController = require('../controllers/regionAreasController.js');

router.get('/get/:region_name', regionAreasController.getByName);

router.post('/insert', regionAreasController.insert);

router.put('/update/:region_name', regionAreasController.update);

router.delete('/delete/:region_name', regionAreasController.delete);

module.exports = router;
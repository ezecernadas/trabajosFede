const express = require('express');
const router = express.Router();
const continentsController = require('../controllers/continentsController.js');

router.get('/get/all', continentsController.getAll);
router.get('/get/all/count_regions', continentsController.countRegions);

router.post('/insert', continentsController.insert);

module.exports = router;
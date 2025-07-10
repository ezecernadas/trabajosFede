const express = require('express');
const router = express.Router();
const continentsController = require('../controllers/continentsController.js');

router.get('/get/:continent_id', continentsController.getById);
router.get('/get/all', continentsController.getAll);
router.get('/get/all/count_regions', continentsController.countRegions);

router.post('/insert', continentsController.insert);

router.put('/update/:continent_id', continentsController.update);

router.delete('/delete/:continent_id', continentsController.delete);

module.exports = router;
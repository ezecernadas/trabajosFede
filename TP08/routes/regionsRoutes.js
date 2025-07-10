const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regionsController.js');

router.get('/get/:region_id', regionsController.getById);

router.post('/insert', regionsController.insert);

router.put('/update/:region_id', regionsController.update);

router.delete('/delete/:region_id', regionsController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const continentsController = require('../controllers/continentsController.js');

router.post('/insert', continentsController.insert);

module.exports = router;
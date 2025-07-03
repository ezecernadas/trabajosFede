const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController.js');

router.get('/getAll', languageController.getAll);
router.post('/insert', languageController.insert);

module.exports = router;
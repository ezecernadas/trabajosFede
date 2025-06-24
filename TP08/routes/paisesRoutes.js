const express = require('express');
const router = express.Router();
const controllerPaises = require('../controllers/controllerPaises.js');

router.get('/paises', controllerPaises.getPaises);

module.exports = router;
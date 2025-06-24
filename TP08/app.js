const express = require('express');
require('dotenv').config();
const api = express();
const checkAPK = require('./middleware/apiAuth');
const paisesRoutes = require('./routes/paisesRoutes.js');

api.use(express.json());
api.use(checkAPK);
api.use('/api/paises', paisesRoutes);

module.exports = api;
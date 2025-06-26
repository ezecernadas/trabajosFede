const express = require('express');
require('dotenv').config();
const api = express();
const checkAPK = require('./middleware/apiAuth');
const countryRoutes = require('./routes/countryRoutes.js');
const languageRoutes = require('./routes/languageRoutes.js');
const regionsRoutes = require('./routes/regionsRoutes.js');
const continentsRoutes = require('./routes/continentsRoutes.js');

api.use(express.json());
api.use(checkAPK);
api.use('/api/country', countryRoutes);
api.use('/api/language', languageRoutes);
api.use('/api/regions', regionsRoutes);
api.use('/api/continents', continentsRoutes);

module.exports = api;
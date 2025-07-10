const express = require('express');
require('dotenv').config();
const api = express();
const checkAPK = require('./middleware/apiAuth');

const swaggerUI = require('swagger-ui-express'); //Para la configuracion de swagger
const swaggerSpec = require('./config/swaggerConfig');//Para la configuracion de swagger

const countryRoutes = require('./routes/countryRoutes.js');
const languageRoutes = require('./routes/languageRoutes.js');
const regionsRoutes = require('./routes/regionsRoutes.js');
const continentsRoutes = require('./routes/continentsRoutes.js');
const countryLanguageRoutes = require('./routes/countryLanguageRoutes.js');
const countryStatsRoutes = require('./routes/countryStatsRoutes.js');
const regionAreasRoutes = require('./routes/regionAreasRoutes.js');

api.use(express.json());

api.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

api.use(checkAPK);

api.use('/api/countries', countryRoutes);
api.use('/api/country_languages', countryLanguageRoutes);
api.use('/api/country_stats', countryStatsRoutes);
api.use('/api/languages', languageRoutes);
api.use('/api/regions', regionsRoutes);
api.use('/api/region_areas', regionAreasRoutes);
api.use('/api/continents', continentsRoutes);

module.exports = api;
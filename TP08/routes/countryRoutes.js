const express = require('express');
const router = express.Router();
const countryController = require('../controllers/countryController.js');

/**
 * @swagger
 * tags:
 *     name: Paises
 *     description: Endpoints para gerenciar países
 */

/**
 * @swagger
 * /countries/get/{country_id}:
 *   get:
 *     summary: Retorna un pais por su ID
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Pais encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   area:
 *                     type: number
 *                     format: double
 *                   national_day:
 *                     type: string
 *                   country_code2:
 *                     type: string
 *                   country_code3:
 *                     type: string
 *                   region_id:
 *                     type: integer
 *       404:
 *         description: Idioma de país no encontrado
 *       500:
 *         description: Error al obtener el idioma del país
 */
router.get('/get/:country_id', countryController.getById);
router.get('/get/all', countryController.getAll);
router.get('/get/all/language_and_regions', countryController.getAllWithLanguageAndRegions);
router.get('/get/all/continent', countryController.getAllWithContinent);
router.get('/get/all/regions', countryController.getAllWithRegions);
router.get('/get/all/stats', countryController.getAllWithStats);
router.get('/get/all/languages', countryController.getAllWithLanguages);
router.get('/get/all/area', countryController.getAllWithRegionAndArea);
router.get('/get/all/national_day', countryController.getAllWithNationalDay);

router.post('/insert', countryController.insert);

router.put('/update/:country_id', countryController.update);

router.delete('/delete/:country_id', countryController.delete);

module.exports = router;
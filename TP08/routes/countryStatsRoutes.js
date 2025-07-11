const express = require('express');
const router = express.Router();
const countryStatsController = require('../controllers/countryStatsController.js');

/**
 * @swagger
 * tags:
 *     name: Estadísticas de Países
 *     description: Endpoints para gerenciar estadísticas de países
 */

/**
 * @swagger
 * /country_stats/get/{country_id}/{year}:
 *   get:
 *     summary: Obtener estadísticas de un país por ID y año
 *     tags: [Estadísticas de Países]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del país
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año de las estadísticas
 *     responses:
 *       200:
 *         description: Estadísticas del país obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country_id:
 *                   type: string
 *                 year:
 *                   type: integer
 *                 data:
 *                   type: object
 *       404:
 *         description: Estadísticas del país no encontradas
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/:country_id/:year', countryStatsController.getById);

/**
 * @swagger
 * /country_stats/insert:
 *   post:
 *     summary: Insertar estadísticas de un país
 *     tags: [Estadísticas de Países]
 *     requestBody:
 *       required: true
 *       content:   
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_id:
 *                 type: string
 *               year:
 *                 type: integer
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Estadísticas de países insertadas correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/insert', countryStatsController.insert);

/**
 * @swagger
 * /country_stats/update/{country_id}/{year}:
 *   put:
 *     summary: Actualizar estadísticas de un país por ID y año
 *     tags: [Estadísticas de Países]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del país
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año de las estadísticas a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               year:
 *                 type: integer
 *               population:
 *                 type: integer
 *               gdp:
 *                 type: number
 *     responses:
 *       200:
 *         description: Estadísticas del país actualizadas exitosamente
 *       404:
 *         description: Estadísticas del país no encontradas para actualizar
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update/:country_id/:year', countryStatsController.update);

/**
 * @swagger
 * /country_stats/delete/{country_id}/{year}:
 *   delete:
 *     summary: Eliminar estadísticas de un país por ID y año
 *     tags: [Estadísticas de Países]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del país
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Año de las estadísticas a eliminar
 *     responses:
 *       200:
 *         description: Estadísticas del país eliminadas exitosamente
 *       404:
 *         description: Estadísticas del país no encontradas para eliminar
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:country_id/:year', countryStatsController.delete);

module.exports = router;
const express = require('express');
const router = express.Router();
const continentsController = require('../controllers/continentsController.js');

/**
 * @swagger
 * /continents:
 *   get:
 *     summary: Obtiene todos los continentes
 *     tags:
 *       - Continents
 *     responses:
 *       200:
 *         description: Los continentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Continents'
 */
router.get('/get/all', continentsController.getAll);

/**
 * @swagger
 * /continents/{continent_id}:
 *   get:
 *     summary: Obtiene un continente por ID
 *     tags:
 *       - Continents
 *     parameters:
 *       - in: path
 *         name: continent_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: El continente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Continents'
 *       404:
 *         description: No se encontr  el continente
 */
router.get('/get/:continent_id', continentsController.getById);

/**
 * @swagger
 * /continents/all/count_regions:
 *   get:
 *     summary: Obtiene el n mero de regiones por cada continente
 *     tags:
 *       - Continents
 *     responses:
 *       200:
 *         description: El n mero de regiones por cada continente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ContinentsCountRegions'
 */
router.get('/get/all/count_regions', continentsController.countRegions);

/**
 * @swagger
 * /continents:
 *   post:
 *     summary: Crea un nuevo continente
 *     tags:
 *       - Continents
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Continents'
 *     responses:
 *       201:
 *         description: El nuevo continente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Continents'
 *       400:
 *         description: No se enviaron los datos requeridos
 */
router.post('/insert', continentsController.insert);

/**
 * @swagger
 * /continents/{continent_id}:
 *   put:
 *     summary: Actualiza un continente
 *     tags:
 *       - Continents
 *     parameters:
 *       - in: path
 *         name: continent_id
 *         schema:
 *           type: integer
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Continents'
 *     responses:
 *       200:
 *         description: El continente actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Continents'
 *       404:
 *         description: No se encontr  el continente
 */
router.put('/update/:continent_id', continentsController.update);

/**
 * @swagger
 * /continents/{continent_id}:
 *   delete:
 *     summary: Elimina un continente
 *     tags:
 *       - Continents
 *     parameters:
 *       - in: path
 *         name: continent_id
 *         schema:
 *           type: integer
 *         required: true
 *     responses:
 *       200:
 *         description: El continente eliminado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Continents'
 *       404:
 *         description: No se encontr  el continente
 */
router.delete('/delete/:continent_id', continentsController.delete);

module.exports = router;
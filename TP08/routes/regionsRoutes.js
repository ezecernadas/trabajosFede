const express = require('express');
const router = express.Router();
const regionsController = require('../controllers/regionsController.js');

/**
 * @swagger
 * tags:
 *     name: Regiones
 *     description: Endpoints para gerenciar regiones
 */

/**
 * @swagger
 * /regions/get/{region_id}:
 *   get:
 *     summary: Obtener una región por ID
 *     tags: [Regiones]
 *     parameters:
 *       - in: path
 *         name: region_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la región
 *     responses:
 *       200:
 *         description: Región obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 continent_id:
 *                   type: integer
 *       404:
 *         description: Región no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/:region_id', regionsController.getById);

/**
 * @swagger
 * /regions/insert:
 *   post:
 *     summary: Insertar una región
 *     tags: [Regiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region_id:
 *                 type: integer
 *               name:
 *                 type: string
 *               continent_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Región insertada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 continent_id:
 *                   type: integer
 *       500:
 *         description: Error interno del servidor
 */
router.post('/insert', regionsController.insert);

/**
 * @swagger
 * /regions/update/{region_id}:
 *   put:
 *     summary: Actualizar una región por ID
 *     tags: [Regiones]
 *     parameters:
 *       - in: path
 *         name: region_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la región a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               continent_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Región actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 continent_id:
 *                   type: integer
 *       404:
 *         description: Región no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update/:region_id', regionsController.update);

/**
 * @swagger
 * /regions/delete/{region_id}:
 *   delete:
 *     summary: Eliminar una región por ID
 *     tags: [Regiones]
 *     parameters:
 *       - in: path
 *         name: region_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la región a eliminar
 *     responses:
 *       200:
 *         description: Región eliminada correctamente
 *       404:
 *         description: Región no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:region_id', regionsController.delete);

module.exports = router;
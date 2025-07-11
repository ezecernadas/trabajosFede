const express = require('express');
const router = express.Router();
const regionAreasController = require('../controllers/regionAreasController.js');

/**
 * @swagger
 * tags:
 *     name: Áreas de Regiones
 *     description: Endpoints para gerenciar áreas de regiones
 */

/**
 * @swagger
 * /region_areas/get/{region_name}:
 *   get:
 *     summary: Obtener una área de una región por nombre
 *     tags: [Áreas de Regiones]
 *     parameters:
 *       - in: path
 *         name: region_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la región
 *     responses:
 *       200:
 *         description: Área de región obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region_name:
 *                   type: string
 *                 region_area:
 *                   type: number
 *                   format: double
 *       404:
 *         description: Área de región no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/:region_name', regionAreasController.getByName);

/**
 * @swagger
 * /region_areas/insert:
 *   post:
 *     summary: Insertar una área de una región
 *     tags: [Áreas de Regiones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region_name:
 *                 type: string
 *               region_area:
 *                 type: number
 *                 format: double
 *     responses:
 *       201:
 *         description: Área de región insertada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 region_name:
 *                   type: string
 *                 region_area:
 *                   type: number
 *                   format: double
 *       500:
 *         description: Error interno del servidor
 */
router.post('/insert', regionAreasController.insert);

/**
 * @swagger
 * /region_areas/update/{region_name}:
 *   put:
 *     summary: Actualizar un área de una región por nombre
 *     tags: [Áreas de Regiones]
 *     parameters:
 *       - in: path
 *         name: region_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la región
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               region_area:
 *                 type: number
 *                 format: double
 *     responses:
 *       200:
 *         description: Área de región actualizada correctamente
 *       404:
 *         description: Área de región no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update/:region_name', regionAreasController.update);

/**
 * @swagger
 * /region_areas/delete/{region_name}:
 *   delete:
 *     summary: Eliminar un área de una región por nombre
 *     tags: [Áreas de Regiones]
 *     parameters:
 *       - in: path
 *         name: region_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la región a eliminar
 *     responses:
 *       200:
 *         description: Área de región eliminada correctamente
 *       404:
 *         description: Área de región no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:region_name', regionAreasController.delete);

module.exports = router;
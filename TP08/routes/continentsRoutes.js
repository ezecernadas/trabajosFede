const express = require('express');
const router = express.Router();
const continentsController = require('../controllers/continentsController.js');

/**
 * @swagger
 * tags:
 *     name: Continentes
 *     description: Endpoints para gerenciar continentes
 */


/** * @swagger
 * /continents/get/all:
 *   get:
 *     summary: Retorna todos los continentes
 *     tags: [Continentes]
 *     responses:
 *       200:
 *         description: Lista de continentes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   continent_id:
 *                     type: integer
 *                   name:
 *                     type: string
 *       500:
 *         description: Error al obtener los continentes
 */
router.get('/get/all', continentsController.getAll);

/**
 * @swagger
 * /continents/get/{continent_id}:
 *   get:
 *     summary: Retorna un continente por su ID
 *     tags: [Continentes]
 *     parameters:
 *       - in: path
 *         name: continent_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del continente
 *     responses:
 *       200:
 *         description: Continente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 continent_id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: Continente no encontrado	
 *       500:
 *         description: Error al obtener el continente
 */
router.get('/get/:continent_id', continentsController.getById);

/**
 * @swagger
 * /continents/get/all/count_regions:
 *   get:
 *     summary: Retorna la cantidad de regiones por continente
 *     tags: [Continentes]
 *     responses:
 *       200:
 *         description: Cantidad de regiones por continente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 continent_id:
 *                   type: integer
 *                 region_count:
 *                   type: integer
 *       500:
 *         description: Error al obtener la cantidad de regiones
 */
router.get('/get/all/count_regions', continentsController.countRegions);

/** * @swagger
 * /continents/insert:
 *   post:
 *     summary: Inserta un nuevo continente
 *     tags: [Continentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Continente insertado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 id:
 *                   type: integer
 *       500:
 *         description: Error al insertar el continente
 */
router.post('/insert', continentsController.insert);

/** * @swagger
 * /continents/update/{continent_id}:
 *   put:
 *     summary: Actualiza un continente por su ID
 *     tags: [Continentes]
 *     parameters:
 *       - in: path
 *         name: continent_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del continente a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Continente actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Continente no encontrado	
 *       500:
 *         description: Error al actualizar el continente
 */
router.put('/update/:continent_id', continentsController.update);

/** * @swagger
 * /continents/delete/{continent_id}:
 *   delete:
 *     summary: Elimina un continente por su ID
 *     tags: [Continentes]
 *     parameters:
 *       - in: path
 *         name: continent_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del continente a eliminar
 *     responses:
 *       200:
 *         description: Continente eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Continente no encontrado	
 *       500:
 *         description: Error al eliminar el continente
 */
router.delete('/delete/:continent_id', continentsController.delete);

module.exports = router;
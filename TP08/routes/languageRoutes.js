const express = require('express');
const router = express.Router();
const languageController = require('../controllers/languageController.js');

/**
 * @swagger
 * tags:
 *     name: Idiomas
 *     description: Endpoints para gerenciar idiomas
 */

/**
 * @swagger
 * /languages/get/{language_id}:
 *   get:
 *     summary: Obtener un idioma por ID
 *     tags: [Idiomas]
 *     parameters:
 *       - in: path
 *         name: language_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del idioma
 *     responses:
 *       200:
 *         description: Idioma obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 language:
 *                   type: string
 *       404:
 *         description: Idioma no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/:language_id', languageController.getById);

/**
 * @swagger
 * /languages/get/all:
 *   get:
 *     summary: Obtener todos los idiomas
 *     tags: [Idiomas]
 *     responses:
 *       200:
 *         description: Lista de idiomas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   language:
 *                     type: string
 */
router.get('/get/all', languageController.getAll);

/**
 * @swagger
 * /languages/get/all/count_countries:
 *   get:
 *     summary: Obtener todos los idiomas con el conteo de países que los hablan
 *     tags: [Idiomas]
 *     responses:
 *       200:
 *         description: Lista de idiomas con conteo de países obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   language:
 *                     type: string
 *                   countries_with_language:
 *                     type: integer
 */
router.get('/get/all/count_countries', languageController.getAllWithCountriesOficialLanguage);

/**
 * @swagger
 * /languages/get/all/languages_by_continent/{continent}:
 *   get:
 *     summary: Obtener todos los idiomas de un continente
 *     tags: [Idiomas]
 *     parameters:
 *       - in: path
 *         name: continent
 *         required: true
 *         schema:
 *           type: string   
 *         description: Nombre del continente
 *     responses:
 *       200:
 *         description: Lista de idiomas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   language:
 *                     type: string
 *       404:
 *        description: Continente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.get('/get/all/languages_by_continent/:continent', languageController.getLanguagesByContinent);

/**
 * @swagger
 * /languages/insert:
 *   post:
 *     summary: Insertar un nuevo idioma
 *     tags: [Idiomas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *     responses:
 *       201:
 *         description: Idioma insertado correctamente
 *       500:
 *         description: Error interno del servidor
 */
router.post('/insert', languageController.insert);

/**
 * @swagger
 * /languages/update/{language_id}:
 *   put:
 *     summary: Actualizar un idioma por ID
 *     tags: [Idiomas]
 *     parameters:
 *       - in: path
 *         name: language_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del idioma a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language:
 *                 type: string
 *     responses:
 *       200:
 *         description: Idioma actualizado correctamente
 *       404:
 *         description: Idioma no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.put('/update/:language_id', languageController.update);

/**
 * @swagger
 * /languages/delete/{language_id}:
 *   delete:
 *     summary: Eliminar un idioma por ID
 *     tags: [Idiomas]
 *     parameters:
 *       - in: path
 *         name: language_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del idioma a eliminar
 *     responses:
 *       200:
 *         description: Idioma eliminado correctamente
 *       404:
 *         description: Idioma no encontrado
 *       500:
 *         description: Error interno del servidor
 */
router.delete('/delete/:language_id', languageController.delete);

module.exports = router;
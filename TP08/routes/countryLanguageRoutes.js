const express = require('express');
const router = express.Router();
const countryLanguageController = require('../controllers/countryLanguageController.js');

/**
 * @swagger
 * tags:
 *     name: Idiomas de Países
 *     description: Endpoints para gerenciar idiomas de países
 */

/**
 * @swagger
 * /country_languages/get/all:
 *   get:
 *     summary: Retorna todos los idiomas de países
 *     tags: [Idiomas de Países]
 *     responses:
 *       200:
 *         description: Lista de idiomas de países
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country_id:
 *                     type: integer
 *                   language_id:
 *                     type: integer
 *                   official:
 *                     type: boolean
 *       500:
 *         description: Error al obtener los idiomas de países
 */
router.get('/get/:country_id', countryLanguageController.getById);

/**
 * @swagger
 * /country_languages/insert:
 *   post:
 *     summary: Inserta un nuevo idioma de países
 *     tags: [Idiomas de Países]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               country_id:
 *                 type: integer
 *               language_id:
 *                 type: integer
 *               official:
 *                 type: boolean

 */
router.post('/insert', countryLanguageController.insert);

/**
 * @swagger
 * /country_languages/update/{country_id}:
 *   put:
 *     summary: Actualiza un idioma de país por su ID
 *     tags: [Idiomas de Países]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del país
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               language_id:
 *                 type: integer
 *               official:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Idioma de país actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 country_id:
 *                   type: integer
 *                 language_id:
 *                   type: integer
 *                 official:
 *                   type: boolean
 *       500:
 *         description: Error al actualizar el idioma de país
 */
router.put('/update/:country_id', countryLanguageController.update);

/**
 * @swagger
 * /country_languages/delete/{country_id}:
 *   delete:
 *     summary: Elimina un idioma de país por su ID
 *     tags: [Idiomas de Países]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del país a eliminar
 *     responses:
 *       200:
 *         description: Idioma de país eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Error al eliminar el idioma de país
 */
router.delete('/delete/:country_id', countryLanguageController.delete);

module.exports = router;
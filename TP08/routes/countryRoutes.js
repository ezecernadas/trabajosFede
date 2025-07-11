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

/**
 * @swagger
 * /countries/get/all:
 *   get:
 *     summary: Retorna todos los paises
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de paises
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
 *                    type: string
 *                   country_code2:
 *                     type: string
 *                   country_code3:
 *                     type: string
 *                   region_id:
 *                     type: integer
 *       500:
 *         description: Error al obtener los paises
 */
router.get('/get/all', countryController.getAll);

/**
 * @swagger
 * /countries/get/all/language_and_regions:
 *   get:
 *     summary: Retorna todos los paises con sus respectivos idiomas y regiones
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de paises con sus respectivos idiomas y regiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   country_code2:
 *                     type: string
 *                   language:
 *                     type: string
 *                   region:
 *                     type: string
 *       500:
 *         description: Error al obtener los paises con sus respectivos idiomas y regiones
 */
router.get('/get/all/language_and_regions', countryController.getAllWithLanguageAndRegions);

/**
 * @swagger
 * /countries/get/all/continent:
 *   get:
 *    summary: Retorna todos los paises con sus respectivos continentes
 *    tags: [Paises]
 *    responses:
 *      200:
 *        description: Lista de paises con sus respectivos continentes
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  country:
 *                    type: string
 *                  continent:
 *                    type: string
 *      500:
 *        description: Error al obtener los paises con sus respectivos continentes
 */
router.get('/get/all/continent', countryController.getAllWithContinent);

/**
 * @swagger
 * /countries/get/all/regions:
 *   get:
 *     summary: Retorna todos los paises con sus respectivas regiones
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de paises con sus respectivas regiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   region:
 *                     type: string
 *       500:
 *         description: Error al obtener los paises con sus respectivas regiones
 */
router.get('/get/all/regions', countryController.getAllWithRegions);

/**
 * @swagger
 * /countries/get/all/stats:
 *   get:
 *     summary: Retorna todas las estadísticas de los paises
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de estadísticas de los paises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: integer
 *                   year:
 *                     type: number
 *                   population:
 *                     type: integer
 *                   gdp:
 *                     type: number
 *       500:
 *         description: Error al obtener las estadísticas de los paises
 */
router.get('/get/all/stats', countryController.getAllWithStats);

/**
 * @swagger
 * /countries/get/all/languages:
 *   get:
 *     summary: Retorna todos los paises con sus respectivos idiomas
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de paises con sus respectivos idiomas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   official_language:
 *                     type: string
 *       500:
 *         description: Error al obtener los paises con sus respectivos idiomas
 */
router.get('/get/all/languages', countryController.getAllWithLanguages);

/**
 * @swagger
 * /countries/get/all/area:
 *   get:
 *     summary: Retorna todos los paises con sus respectivas areas
 *     tags: [Paises]
 *     responses:
 *       200:
 *         description: Lista de paises con sus respectivas areas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   country:
 *                     type: string
 *                   region:
 *                     type: string
 *                   area:
 *                     type: number
 *                     format: double
 *       500:
 *         description: Error al obtener los paises con sus respectivas areas
 */
router.get('/get/all/area', countryController.getAllWithRegionAndArea);

/**
 * @swagger
 * /countries/get/all/national_day:
 *   get:
 *    summary: Retorna los países que tengan una fiesta nacional, junto con la región y continente.
 *    tags: [Paises]
 *    responses:
 *      200:    
 *        description: Lista de paises que tengan una fiesta nacional, junto con la región y continente.
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  country:
 *                    type: string
 *                  region:
 *                    type: string
 *                  continent:
 *                    type: string
 *      500:
 *        description: Error al obtener los paises que tengan una fiesta nacional, junto con la región y continente.
 */
router.get('/get/all/national_day', countryController.getAllWithNationalDay);

/**
 * @swagger
 * /countries/insert:
 *   post:
 *     summary: Inserta un nuevo pais
 *     tags: [Paises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               area:
 *                 type: number
 *                 format: double
 *               national_day:
 *                 type: string
 *               country_code2:
 *                 type: string
 *               country_code3:
 *                 type: string
 *               region_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pais insertado correctamente
 *       500:
 *         description: Error al insertar el pais
 */
router.post('/insert', countryController.insert);

/**
 * @swagger
 * /countries/update/{country_id}:
 *   put:
 *     summary: Actualiza un pais
 *     tags: [Paises]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               area:
 *                 type: number
 *                 format: double
 *               national_day:
 *                 type: string
 *               country_code2:
 *                 type: string
 *               country_code3:
 *                 type: string
 *               region_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pais actualizado correctamente
 *       500:
 *         description: Error al actualizar el pais
 *       400:
 *        description: ID de país inválido, Faltan campos obligatorios o cuerpo de solicitud vacío
 */
router.put('/update/:country_id', countryController.update);

/**
 * @swagger
 * /countries/delete/{country_id}:
 *   delete:
 *     summary: Elimina un pais por su ID
 *     tags: [Paises]
 *     parameters:
 *       - in: path
 *         name: country_id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del pais a eliminar
 *     responses:
 *       200:
 *         description: Pais eliminado correctamente
 *       404:
 *         description: Pais no encontrado
 *       500:
 *         description: Error al eliminar el pais
 */
router.delete('/delete/:country_id', countryController.delete);

module.exports = router;
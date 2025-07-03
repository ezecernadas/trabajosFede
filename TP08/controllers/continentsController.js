const continents = require('../models/continentsModels');

exports.getAll = async (req, res) => {
    try {
        const result = await continents.getAll();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al obtener continentes:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.countRegions = async (req, res) => {
    try {
        const result = await continents.countRegions();
        res.status(200).json(result);
    } catch (error) {
        console.error('Error al contar regiones:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

exports.insert = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await continents.insert(name);
        res.status(201).json({ message: 'Continente insertado correctamente', id: result.insertId });
    } catch (error) {
        console.error('Error al insertar continente:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
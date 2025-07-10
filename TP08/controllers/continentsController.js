const continents = require('../models/continentsModels');

exports.getById = async (req, res) => {
    const continent_id = req.params.continent_id;
    if (!continent_id || isNaN(continent_id)) {
        return res.status(400).json({ error: "ID de continente inválido" });
    }
    try {
        const data = await continents.getById(continent_id);
        if (!data || data.length === 0) {
            return res.status(404).json({ error: "Continente no encontrado" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el continente:", error);
        res.status(500).json({ error: "Error al obtener el continente" });
    }
}

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

exports.update = async (req, res) => {
    const continent_id = req.params.continent_id;
    const { name } = req.body;

    if (!continent_id || isNaN(continent_id)) {
        return res.status(400).json({ error: "ID de continente inválido" });
    }

    try {
        // Verificar si el continente existe antes de actualizar
        const existing = await continents.getById(continent_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Continente no encontrado" });
        }

        const result = await continents.update(continent_id, name);
        res.status(200).json({ message: "Continente actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el continente:", error);
        res.status(500).json({ error: "Error al actualizar el continente" });
    }
}

exports.delete = async (req, res) => {
    const continent_id = req.params.continent_id;

    if (!continent_id || isNaN(continent_id)) {
        return res.status(400).json({ error: "ID de continente inválido" });
    }

    try {
        // Verificar si el continente existe antes de eliminar
        const existing = await continents.getById(continent_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Continente no encontrado" });
        }

        await continents.delete(continent_id);
        res.status(200).json({ message: "Continente eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el continente:", error);
        res.status(500).json({ error: "Error al eliminar el continente" });
    }
}
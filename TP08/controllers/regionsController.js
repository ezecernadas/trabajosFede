const regions = require('../models/regionsModels.js');

// <--------- Get --------->
exports.getById = async (req, res) => {
    const region_id = req.params.region_id;
    if (!region_id || isNaN(region_id)) {
        return res.status(400).json({ error: "ID de región inválido" });
    }
    try {
        const data = await regions.getById(region_id);
        if (!data) {
            return res.status(404).json({ error: "Región no encontrada" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener la región:", error);
        res.status(500).json({ error: "Error al obtener la región" });
    }
}

exports.insert = async (req, res) => {
    const { name, region_id, continent_id } = req.body;
    if (!name || !region_id || !continent_id) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    try {
        const result = await regions.insert(name, region_id, continent_id);
        res.status(201).json({ message: "Región insertada correctamente", regionId: result.insertId });
    } catch (error) {
        console.error("Error al insertar la región:", error);
        res.status(500).json({ error: "Error al insertar la región" });
    }
}

exports.update = async (req, res) => {
    const region_id = req.params.region_id;
    const { name, continent_id } = req.body;

    if (!region_id || isNaN(region_id) || !name || !continent_id) {
        return res.status(400).json({ error: "Faltan datos requeridos o ID de región inválido" });
    }

    try {
        // Verificar si la región existe antes de actualizar
        const existing = await regions.getById(region_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Región no encontrada" });
        }

        const result = await regions.update(name, region_id, continent_id);
        res.status(200).json({ message: "Región actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar la región:", error);
        res.status(500).json({ error: "Error al actualizar la región" });
    }
}

exports.delete = async (req, res) => {
    const region_id = req.params.region_id;
    if (!region_id || isNaN(region_id)) {
        return res.status(400).json({ error: "ID de región inválido" });
    }
    try {
        // Verificar si la región existe antes de intentar eliminarla
        const existingRegion = await regions.getById(region_id);
        if (!existingRegion) {
            return res.status(404).json({ error: "Región no encontrada" });
        }
        await regions.delete(region_id);
        res.status(200).json({ message: "Región eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar la región:", error);
        res.status(500).json({ error: "Error al eliminar la región" });
    }
}
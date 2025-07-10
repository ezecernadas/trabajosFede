const regionAreas = require('../models/regionAreasModels.js');

exports.getByName = async (req, res) => {
    const region_name = req.params.region_name;
    if (!region_name) {
        return res.status(400).json({ error: "Nombre de región inválido" });
    }
    try {
        const data = await regionAreas.getByName(region_name);
        if (!data) {
            return res.status(404).json({ error: "Área de región no encontrada" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el área de la región:", error);
        res.status(500).json({ error: "Error al obtener el área de la región" });
    }
}

exports.insert = async (req, res) => {
    const { region_name, region_area } = req.body;
    if (!region_name || !region_area) {
        return res.status(400).json({ error: "Faltan datos requeridos" });
    }
    try {
        const result = await regionAreas.insert(region_name, region_area);
        res.status(201).json({ message: "Área de región insertada correctamente", regionId: result.insertId });
    } catch (error) {
        console.error("Error al insertar el área de la región:", error);
        res.status(500).json({ error: "Error al insertar el área de la región" });
    }
}

exports.update = async (req, res) => {
    const region_name = req.params.region_name;
    const { region_area } = req.body;

    if (!region_name || !region_area) {
        return res.status(400).json({ error: "Faltan datos requeridos o nombre de región inválido" });
    }

    try {
        // Verificar si el área de la región existe antes de actualizar
        const existing = await regionAreas.getByName(region_name);
        if (!existing) {
            return res.status(404).json({ error: "Área de región no encontrada" });
        }

        const result = await regionAreas.update(region_name, region_area);
        res.status(200).json({ message: "Área de región actualizada correctamente" });
    } catch (error) {
        console.error("Error al actualizar el área de la región:", error);
        res.status(500).json({ error: "Error al actualizar el área de la región" });
    }
}

exports.delete = async (req, res) => {
    const region_name = req.params.region_name;
    if (!region_name) {
        return res.status(400).json({ error: "Nombre de región inválido" });
    }
    try {
        // Verificar si el área de la región existe antes de eliminar
        const existing = await regionAreas.getByName(region_name);
        if (!existing) {
            return res.status(404).json({ error: "Área de región no encontrada" });
        }
        const result = await regionAreas.delete(region_name);
        res.status(200).json({ message: "Área de región eliminada correctamente" });
    } catch (error) {
        console.error("Error al eliminar el área de la región:", error);
        res.status(500).json({ error: "Error al eliminar el área de la región" });
    }
}
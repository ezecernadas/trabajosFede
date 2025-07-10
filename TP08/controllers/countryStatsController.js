const stats = require('../models/countryStatsModels.js');

exports.getById = async (req, res) => {
    const { country_id, year } = req.params;
    try {
        const result = await stats.getById(country_id, year);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener las estadísticas del país:", error);
        res.status(500).json({ error: "Error al obtener las estadísticas del país" });
    }
}

exports.insert = async (req, res) => {
    const { country_id, year, population, gdp } = req.body;
    try {
        const result = await stats.insert(country_id, year, population, gdp);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error al insertar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al insertar las estadísticas del país" });
    }
}

exports.update = async (req, res) => {
    const { country_id, year } = req.params;
    const { population, gdp } = req.body;
    try {
        const existing = await stats.getById(country_id, year);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }
        const result = await stats.update(population, gdp, country_id, year);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al actualizar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al actualizar las estadísticas del país" });
    }
}

exports.delete = async (req, res) => {
    const { country_id, year } = req.params;
    try {
        const existing = await stats.getById(country_id, year);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Registro no encontrado" });
        }
        const result = await stats.delete(country_id, year);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al eliminar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al eliminar las estadísticas del país" });
    }
}
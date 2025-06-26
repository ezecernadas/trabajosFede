const regions = require('../models/regionsModels.js');

exports.insert = async (req, res) => {
    const { name, region_id, continent_id } = req.body;
    try {
        const result = await regions.insert(name, region_id, continent_id);
        res.status(201).json({ message: "Región insertada correctamente", id: result.insertId });
    } catch (error) {
        console.error("Error al insertar la región:", error);
        res.status(500).json({ error: "Error al insertar la región" });
    }
}
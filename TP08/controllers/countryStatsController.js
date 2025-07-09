const stats = require('../models/countryStatsModels.js');

exports.update = async (req, res) => {
    try {
        const { idCountry, year } = req.params;
        const stats = req.body;
        const result = await stats.updateStats(idCountry, year, stats);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al actualizar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al actualizar las estadísticas del país" });
    }
}

exports.delete = async (req, res) => {
    const { idCountry, year } = req.params;
    try {
        const result = await stats.deleteCountryStats(idCountry, year);
        res.status(200).json(result);
    } catch (error) {
        if (error.errno === 1451) {
            return res.status(400).json({ error: "No se puede eliminar el país porque tiene estadísticas asociadas" });
        }
        console.error("Error al eliminar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al eliminar las estadísticas del país" });
    }
}
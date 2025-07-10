const countryLanguage = require('../models/countryLanguageModels.js');

exports.getById = async (req, res) => {
    const country_id = req.params.country_id;
    if (!country_id || isNaN(country_id)) {
        return res.status(400).json({ error: "ID de país inválido" });
    }
    try {
        const result = await countryLanguage.getById(country_id);
        if (!result || result.length === 0) {
            return res.status(404).json({ error: "Idioma del país no encontrado" });
        }
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al obtener el idioma del país:", error);
        res.status(500).json({ error: "Error al obtener el idioma del país" });
    }
}

exports.insert = async (req, res) => {
    const { country_id, language_id, official } = req.body;
    try {
        const result = await countryLanguage.insert(country_id, language_id, official);
        res.status(201).json({ message: "Idioma insertado correctamente", id: result.country_id });
    } catch (error) {
        console.error("Error al insertar el idioma del país:", error);
        res.status(500).json({ error: "Error al insertar el idioma del país" });
    }
}

exports.update = async (req, res) => {
    const country_id = req.params.country_id;
    const { language_id, official } = req.body;

    if (!country_id || isNaN(country_id)) {
        return res.status(400).json({ error: "ID de país inválido" });
    }

    try {
        // Verificar si el continente existe antes de actualizar
        const existing = await countryLanguage.getById(country_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Idioma del país no encontrado" });
        }
        const result = await countryLanguage.update(country_id, language_id, official);
        res.status(200).json({ message: "Idioma del país actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el idioma del país:", error);
        res.status(500).json({ error: "Error al actualizar el idioma del país" });
    }
}

exports.delete = async (req, res) => {
    const country_id = req.params.country_id;

    if (!country_id || isNaN(country_id)) {
        return res.status(400).json({ error: "ID de país inválido" });
    }

    try {
        // Verificar si el idioma del país existe antes de eliminar
        const existing = await countryLanguage.getById(country_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Idioma del país no encontrado" });
        }
        await countryLanguage.delete(country_id);
        res.status(200).json({ message: "Idioma del país eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el idioma del país:", error);
        res.status(500).json({ error: "Error al eliminar el idioma del país" });
    }
}

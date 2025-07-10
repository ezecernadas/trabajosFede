const languageModel  = require('../models/languageModels.js');

exports.getById = async (req, res) => {
    const { language_id } = req.params;
    try {
        const data = await languageModel.getById(language_id);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el idioma:", error);
        res.status(500).json({ error: "Error al obtener el idioma" });
    }
}

exports.getAll = async (req, res) => {
    try {
        const data = await languageModel.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los idiomas:", error);
        res.status(500).json({ error: "Error al obtener los idiomas" });
    }
}

exports.getAllWithCountriesOficialLanguage = async (req, res) => {
    try {
        const data = await languageModel.getAllWithCountriesOficialLanguage();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los idiomas con países:", error);
        res.status(500).json({ error: "Error al obtener los idiomas con países" });
    }
}

exports.getLanguagesByContinent = async (req, res) => {
    const { continent } = req.query;
    try {
        const data = await languageModel.getLanguagesByContinent(continent);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los idiomas por continente:", error);
        res.status(500).json({ error: "Error al obtener los idiomas por continente" });
    }
}

exports.insert = async (req, res) => {
    const { language } = req.body;
    try {
        const result = await languageModel.insert(language);
        res.status(201).json({ message: "Idioma insertado correctamente", id: result.insertId });
    } catch (error) {
        console.error("Error al insertar el idioma:", error);
        res.status(500).json({ error: "Error al insertar el idioma" });
    }
}

exports.update = async (req, res) => {
    const { language_id } = req.params;
    const { language } = req.body;
    try {
        // Verifica si el registro existe
        const existing = await languageModel.getById(language_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Idioma no encontrado" });
        }
        await languageModel.update(language_id, language);
        res.status(200).json({ message: "Idioma actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el idioma:", error);
        res.status(500).json({ error: "Error al actualizar el idioma" });
    }
}

exports.delete = async (req, res) => {
    const { language_id } = req.params;
    try {
        // Verifica si el registro existe
        const existing = await languageModel.getById(language_id);
        if (!existing || existing.length === 0) {
            return res.status(404).json({ error: "Idioma no encontrado" });
        }
        await languageModel.delete(language_id);
        res.status(200).json({ message: "Idioma eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el idioma:", error);
        res.status(500).json({ error: "Error al eliminar el idioma" });
    }
}
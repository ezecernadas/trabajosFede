const languageModel  = require('../models/languageModels.js');

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
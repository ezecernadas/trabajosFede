const countryLanguage = require('../models/countryLanguageModels.js');

exports.insert = async (req, res) => {
    const { country_id, language_id, official } = req.body;
    try {
        const result = await countryLanguage.insert(country_id, language_id, official);
        res.status(201).json({ message: "Idioma insertado correctamente", id: result.insertId });
    } catch (error) {
        console.error("Error al insertar el idioma del país:", error);
        res.status(500).json({ error: "Error al insertar el idioma del país" });
    }
}


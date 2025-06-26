const languageModel  = require('../models/languageModels.js');

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
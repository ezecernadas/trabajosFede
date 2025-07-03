const country = require('../models/countryModels.js');

exports.getAll = async (req, res) => {
    try {
        const data = await country.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises:", error);
        res.status(500).json({ error: "Error al obtener los paises" });
    }
}

exports.LanguageAndRegions = async (req, res) => {
    try {
        const data = await country.getAllWithLanguageAndRegions();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con idiomas y regiones:", error);
        res.status(500).json({ error: "Error al obtener los paises con idiomas y regiones" });
    }
}

exports.Continent = async (req, res) => {
    try {
        const data = await country.getAllWithContinent();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con continentes:", error);
        res.status(500).json({ error: "Error al obtener los paises con continentes" });
    }
}

exports.Regions = async (req, res) => {
    try {
        const data = await country.getAllWithRegions();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con regiones:", error);
        res.status(500).json({ error: "Error al obtener los paises con regiones" });
    }
}

exports.languages = async (req, res) => {
    try {
        const data = await country.getAllWithLanguages();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con sus idiomas:", error);
        res.status(500).json({ error: "Error al obtener los paises con sus idiomas" });
    }
}

exports.stats = async (req, res) => {
    try {
        const data = await country.getAllWithStats();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener las estadísticas de los paises:", error);
        res.status(500).json({ error: "Error al obtener las estadísticas de los paises" });
    }
}

exports.area = async (req, res) => {
    try {
        const data = await country.getAllWithRegionAndArea();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con sus regiones y áreas:", error);
        res.status(500).json({ error: "Error al obtener los paises con sus regiones y áreas" });
    }
}

exports.national_day = async (req, res) => {
    try {
        const data = await country.getCountriesWithNationalDay();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con su día nacional:", error);
        res.status(500).json({ error: "Error al obtener los paises con su día nacional" });
    }
}

exports.insert = async (req, res) => {
    const { name, area, national_day, country_code2, country_code3, region_id } = req.body;
    try {
        const result = await country.insert(name, area, national_day, country_code2, country_code3, region_id);
        res.status(201).json({ message: "País insertado correctamente", id: result.insertId });
    } catch (error) {
        console.error("Error al insertar el país:", error);
        res.status(500).json({ error: "Error al insertar el país" });
    }
}

exports.insertLanguage = async (req, res) => {
    const { country_id, language_id, official } = req.body;
    try {
        const result = await country.insertLanguage(country_id, language_id, official);
        res.status(201).json({ message: "Idioma insertado correctamente", id: result.insertId });
    } catch (error) {
        console.error("Error al insertar el idioma del país:", error);
        res.status(500).json({ error: "Error al insertar el idioma del país" });
    }
}

exports.deleteStats = async (req, res) => {
    const { idCountry, year } = req.params;
    try {
        const result = await Country.deleteCountryStats(idCountry, year);
        res.status(200).json(result);
    } catch (error) {
        if (error.errno === 1451) {
            return res.status(400).json({ error: "No se puede eliminar el país porque tiene estadísticas asociadas" });
        }
        console.error("Error al eliminar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al eliminar las estadísticas del país" });
    }
}

exports.updateStats = async (req, res) => {
    try {
        const { idCountry, year } = req.params;
        const stats = req.body;
        const result = await Country.updateStats(idCountry, year, stats);
        res.status(200).json(result);
    } catch (error) {
        console.error("Error al actualizar las estadísticas del país:", error);
        res.status(500).json({ error: "Error al actualizar las estadísticas del país" });
    }
}
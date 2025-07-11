const country = require('../models/countryModels.js');

// <--------- Get --------->
exports.getById = async (req, res) => {
    const country_id = req.params.country_id;
    if (!country_id || isNaN(country_id)) {
        return res.status(400).json({ error: "ID de país inválido" });
    }
    try {
        const data = await country.getById(country_id);
        if (!data) {
            return res.status(404).json({ error: "País no encontrado" });
        }
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener el país:", error);
        res.status(500).json({ error: "Error al obtener el país" });
    }
}

exports.getAll = async (req, res) => {
    try {
        const data = await country.getAll();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises:", error);
        res.status(500).json({ error: "Error al obtener los paises" });
    }
}

exports.getAllWithLanguageAndRegions = async (req, res) => {
    try {
        const data = await country.getAllWithLanguageAndRegions();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con idiomas y regiones:", error);
        res.status(500).json({ error: "Error al obtener los paises con idiomas y regiones" });
    }
}

exports.getAllWithContinent = async (req, res) => {
    try {
        const data = await country.getAllWithContinent();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con continentes:", error);
        res.status(500).json({ error: "Error al obtener los paises con continentes" });
    }
}

exports.getAllWithRegions = async (req, res) => {
    try {
        const data = await country.getAllWithRegions();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con regiones:", error);
        res.status(500).json({ error: "Error al obtener los paises con regiones" });
    }
}

exports.getAllWithStats = async (req, res) => {
    try {
        const data = await country.getAllWithStats();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener las estadísticas de los paises:", error);
        res.status(500).json({ error: "Error al obtener las estadísticas de los paises" });
    }
}

exports.getAllWithLanguages = async (req, res) => {
    try {
        const data = await country.getAllWithLanguages();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con sus idiomas:", error);
        res.status(500).json({ error: "Error al obtener los paises con sus idiomas" });
    }
}

exports.getAllWithRegionAndArea = async (req, res) => {
    try {
        const data = await country.getAllWithRegionAndArea();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con sus regiones y áreas:", error);
        res.status(500).json({ error: "Error al obtener los paises con sus regiones y áreas" });
    }
}

exports.getAllWithNationalDay = async (req, res) => {
    try {
        const data = await country.getAllWithNationalDay();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error al obtener los paises con su día nacional:", error);
        res.status(500).json({ error: "Error al obtener los paises con su día nacional" });
    }
}

// <--------- Insert --------->

exports.insert = async (req, res) => {
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
    }
    const { name, area, national_day, country_code2, country_code3, region_id } = req.body;
    if (!name || !area || !national_day || !country_code2 || !country_code3 || !region_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    try {
        const result = await country.insert(name, area, national_day, country_code2, country_code3, region_id);
        res.status(201).json({ message: "País insertado correctamente", id: result.insertId });
    } catch (error) {
        console.error("Error al insertar el país:", error);
        res.status(500).json({ error: "Error al insertar el país" });
    }
}

// <--------- Update --------->

exports.update = async (req, res) => {
    const country_id = req.params.country_id;
    if (!country_id || isNaN(country_id)) {
        return res.status(400).json({ error: "ID de país inválido" });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "El cuerpo de la solicitud no puede estar vacío" });
    }
    const { name, area, national_day, country_code2, country_code3, region_id } = req.body;
    if (!name || !area || !national_day || !country_code2 || !country_code3 || !region_id) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    try {
        const result = await country.update(country_id, { name, area, national_day, country_code2, country_code3, region_id });
        if (result === null) {
            return res.status(404).json({ error: "País no encontrado" });
        }
        res.status(200).json({ message: "País actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar el país:", error);
        res.status(500).json({ error: "Error al actualizar el país" });
    }
}

// <--------- Delete --------->

exports.delete = async (req, res) => {
    const country_id = req.params.country_id;
    if (!country_id || isNaN(country_id)) {
        return res.status(400).json({ error: "ID de país inválido" });
    }
    try {
        // Verificar si el país existe antes de intentar eliminarlo
        const existingCountry = await country.getById(country_id);
        if (!existingCountry || existingCountry.length === 0) {
            return res.status(404).json({ error: "País no encontrado" });
        }
        await country.delete(country_id);
        res.status(200).json({ message: "País eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el país:", error);
        res.status(500).json({ error: "Error al eliminar el país" });
    }
}
const db = require('../config/db.js');

exports.getById = async (id) => {
    const [result] = await db.query('SELECT * FROM `continents` WHERE continent_id = ?', [id]);
    return result;
}

exports.getAll = async () => {
    const [result] = await db.query('SELECT * FROM `continents`');
    return result;
}

exports.countRegions = async (id) => {
    const [result] = await db.query('SELECT continents.name AS continent, COUNT(regions.region_id) AS total_regions FROM continents JOIN regions ON continents.continent_id = regions.continent_id GROUP BY continents.continent_id, continents.name;');
    return result;
}

exports.insert = async (name) => {
    const [result] = await db.query('INSERT INTO `continents` (name) VALUES (?)', [name]);
    return result;
}

exports.update = async (continent_id, name) => {
    const [result] = await db.query('UPDATE `continents` SET name = ? WHERE continent_id = ?', [name, continent_id]);
    return result;
}

exports.delete = async (continent_id) => {
    const [result] = await db.query('DELETE FROM `continents` WHERE continent_id = ?', [continent_id]);
    return result;
}
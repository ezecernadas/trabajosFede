const db = require('../config/db.js');

exports.getById = async (country_id, year) => {
    const [rows] = await db.query('SELECT * FROM `country_stats` WHERE country_id = ? AND year = ?', [country_id, year]);
    return rows;
}

exports.insert = async (country_id, year, population, gdp) => {
    const [result] = await db.query('INSERT INTO `country_stats` (country_id, year, population, gdp) VALUES (?, ?, ?, ?)', [country_id, year, population, gdp]);
    return result;
}

exports.update= async (population, gdp, country_id, year) => {
    const [result] = await db.query('UPDATE `country_stats` SET population = ?, gdp = ? WHERE country_id = ? AND year = ?', [population, gdp, country_id, year]);
    return result;
}

exports.delete= async (country_id, year) => {
    const [result] = await db.query('DELETE FROM `country_stats` WHERE country_id = ? AND year = ?', [country_id, year]);
    return result;
}
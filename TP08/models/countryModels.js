const db = require('../config/db.js');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM `countries`');
    return rows;
}

exports.insert = async (name, area, national_day, country_code2, country_code3, region_id) => {
    const [result] = await db.query('INSERT INTO `countries` (name, area, national_day, country_code2, country_code3, region_id) VALUES (?, ?, ?, ?, ?, ?)', [name, area, national_day, country_code2, country_code3, region_id]);
    return result;
}

exports.insertLanguage = async (country_id, language_id, official) => {
    const [result] = await db.query('INSERT INTO `country_languages` (country_id, language_id, official) VALUES (?, ?, ?)', [country_id, language_id, official]);
    return result;
}

exports.deleteStats= async (idCountry, year) => {
    const [result] = await db.query('DELETE FROM `country_stats` WHERE country_id = ? AND year = ?', [idCountry, year]);
    return result;
}

exports.updateStats= async (new_year, population, gdp, idCountry, year) => {
    const [result] = await db.query('UPDATE `country_stats` SET year = ?, population = ?, gdp = ? WHERE country_id = ? AND year = ?', [new_year, population, gdp, idCountry, year]);
    return result;
}
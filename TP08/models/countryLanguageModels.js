const db = require('../config/db.js');

exports.getById = async (country_id) => {
    const [result] = await db.query('SELECT * FROM `country_languages` WHERE country_id = ?', [country_id]);
    return result; // Return the first country language or null if not found
}

exports.insert = async (country_id, language_id, official) => {
    const [result] = await db.query('INSERT INTO `country_languages` (country_id, language_id, official) VALUES (?, ?, ?)', [country_id, language_id, official]);
    return result;
}

exports.update = async (country_id, language_id, official) => {
    const [result] = await db.query('UPDATE `country_languages` SET language_id = ?, official = ? WHERE country_id = ?', [language_id, official, country_id]);
    return result;
}

exports.delete = async (country_id) => {
    const [result] = await db.query('DELETE FROM `country_languages` WHERE country_id = ?', [country_id]);
    return result;
}
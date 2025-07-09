const db = require('../config/db.js');
exports.insert = async (country_id, language_id, official) => {
    const [result] = await db.query('INSERT INTO `country_languages` (country_id, language_id, official) VALUES (?, ?, ?)', [country_id, language_id, official]);
    return result;
}
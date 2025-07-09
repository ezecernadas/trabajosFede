const db = require('../config/db.js');

exports.update= async (new_year, population, gdp, idCountry, year) => {
    const [result] = await db.query('UPDATE `country_stats` SET year = ?, population = ?, gdp = ? WHERE country_id = ? AND year = ?', [new_year, population, gdp, idCountry, year]);
    return result;
}

exports.delete= async (idCountry, year) => {
    const [result] = await db.query('DELETE FROM `country_stats` WHERE country_id = ? AND year = ?', [idCountry, year]);
    return result;
}
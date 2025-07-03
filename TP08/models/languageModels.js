const db = require('../config/db.js');

exports.getAll = async () => {
    const [result] = await db.query('SELECT * FROM `languages`');
    return result;
}

exports.getAllWithCountriesOficialLanguage = async () => {
    const [result] = await db.query('SELECT languages.language, COUNT(countries.country_id) AS countries_with_language FROM `languages` INNER JOIN country_languages ON languages.language_id = country_languages.language_id INNER JOIN countries ON country_languages.country_id = countries.country_id WHERE country_languages.official = 1 GROUP BY languages.language_id;');
    return result;
}

exports.getLanguagesByContinent = async (continent) => {
    const [result] = await db.query('SELECT DISTINCT languages.language AS name FROM countries JOIN regions ON countries.region_id = regions.region_id JOIN continents ON regions.continent_id = continents.continent_id JOIN country_languages ON countries.country_id = country_languages.country_id JOIN languages ON country_languages.language_id = languages.language_id WHERE continents.name = ?;', [continent]);
    return result;
}


exports.insert = async (language) => {
    const [result] = await db.query('INSERT INTO `languages`(`language`) VALUES (?)', [language]);
    return result;
}
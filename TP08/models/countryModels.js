const db = require('../config/db.js');

exports.getAll = async () => {
    const [result] = await db.query('SELECT * FROM `countries`');
    return result;
}

exports.getAllWithRegions = async () => {
    const [result] = await db.query('SELECT countries.name AS country, regions.name AS region FROM `countries` INNER JOIN `regions` ON countries.region_id = regions.region_id;');
    return result;
}

exports.getAllWithContinent = async () => {
    const [result] = await db.query('SELECT countries.name AS country, continents.name AS continent FROM `countries` INNER JOIN `regions` ON countries.region_id = regions.region_id INNER JOIN `continents` ON regions.continent_id = continents.continent_id;');
    return result;
}

exports.getAllWithLanguages = async () => {
    const [result] = await db.query('SELECT countries.name AS country, languages.language AS official_language FROM `country_languages` INNER JOIN `countries` ON country_languages.country_id = countries.country_id INNER JOIN `languages` ON languages.language_id = country_languages.language_id WHERE official = 1; ');
    return result;
}

exports.getAllWithLanguageAndRegions = async () => {
    const [result] = await db.query('SELECT countries.name AS country, countries.country_code2 AS country_code, languages.language, regions.name AS region FROM `countries` INNER JOIN country_languages ON country_languages.country_id = countries.country_id INNER JOIN languages ON languages.language_id = country_languages.language_id INNER JOIN regions ON countries.region_id = regions.region_id WHERE country_languages.official = 1; ');
    return result;
}

exports.getAllWithRegionAndArea = async () => {
    const [result] = await db.query('SELECT countries.name AS country, regions.name AS region, region_areas.region_area AS area FROM `countries` INNER JOIN regions ON regions.region_id = countries.region_id INNER JOIN region_areas ON regions.name = region_areas.region_name; ');
    return result;
}

exports.insert = async (name, area, national_day, country_code2, country_code3, region_id) => {
    const [result] = await db.query('INSERT INTO `countries` (name, area, national_day, country_code2, country_code3, region_id) VALUES (?, ?, ?, ?, ?, ?)', [name, area, national_day, country_code2, country_code3, region_id]);
    return result;
}

exports.getAllWithStats = async () => {
    const [result] = await db.query('SELECT countries.name AS country, `year`, `population`, `gdp` FROM `country_stats` INNER JOIN countries ON country_stats.country_id = countries.country_id; ');
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
const db = require('../config/db.js');

// <--------- Get --------->
exports.getById = async (country_id) => {
    const [result] = await db.query('SELECT * FROM `countries` WHERE country_id = ?', [country_id]);
    return result;
}

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

exports.getAllWithNationalDay = async () => {
    const [result] = await db.query('SELECT countries.name AS country, regions.name AS region, continents.name AS continent FROM countries JOIN regions ON countries.region_id = regions.region_id JOIN continents ON regions.continent_id = continents.continent_id WHERE countries.national_day IS NOT NULL;');
    return result;
}

exports.getAllWithStats = async () => {
    const [result] = await db.query('SELECT countries.name AS country, `year`, `population`, `gdp` FROM `country_stats` INNER JOIN countries ON country_stats.country_id = countries.country_id; ');
    return result;
}

// <--------- Insert --------->

/**
 * Insert a new country into the database.
 * @param {string} name - The name of the country.
 * @param {number} area - The area of the country in square kilometers.
 * @param {string} national_day - The national day of the country.
 * @param {string} country_code2 - The two-letter country code.
 * @param {string} country_code3 - The three-letter country code.
 * @param {number} region_id - The id of the region this country belongs to.
 * @returns {Promise.<Object>} The result of the query.
 */
exports.insert = async (name, area, national_day, country_code2, country_code3, region_id) => {
    const [result] = await db.query('INSERT INTO `countries` (name, area, national_day, country_code2, country_code3, region_id) VALUES (?, ?, ?, ?, ?, ?)', [name, area, national_day, country_code2, country_code3, region_id]);
    return result;
}

/**
 * Updates a country's information in the database by its ID.
 * @param {number} country_id - The ID of the country to update.
 * @param {Object} data - The fields to update (name, area, national_day, country_code2, country_code3, region_id).
 * @returns {Promise.<Object|null>} The result of the update query or null if the country does not exist.
 */

exports.update = async (country_id, data) => {
    // Check if the country exists
    const [rows] = await db.query('SELECT country_id FROM countries WHERE country_id = ?', [country_id]);
    if (rows.length === 0) {
        return null;
    }

    const { name, area, national_day, country_code2, country_code3, region_id } = data;
    const [result] = await db.query(
        `UPDATE countries SET name = ?, area = ?, national_day = ?, country_code2 = ?, country_code3 = ?, region_id = ? WHERE country_id = ?`,
        [name, area, national_day, country_code2, country_code3, region_id, country_id]
    );
    return result;
}

// <--------- Delete --------->
exports.delete = async (country_id) => {
    const [result] = await db.query('DELETE FROM `countries` WHERE country_id = ?', [country_id]);
    return result;
}
const db = require('../config/db.js');

exports.insert = async (name, region_id, continent_id) => {
    const [result] = await db.query('INSERT INTO `regions` (name, region_id, continent_id) VALUES (?, ?, ?)', [name, region_id, continent_id]);
    return result;
}
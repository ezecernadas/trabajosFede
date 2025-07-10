const db = require('../config/db.js');

exports.getById = async (id) => {
    const [rows] = await db.query('SELECT * FROM `regions` WHERE region_id = ?', [id]);
    return rows[0];
}

exports.insert = async (name, region_id, continent_id) => {
    const [result] = await db.query('INSERT INTO `regions` (name, region_id, continent_id) VALUES (?, ?, ?)', [name, region_id, continent_id]);
    return result;
}

exports.update = async (name, region_id, continent_id) => {
    const [result] = await db.query('UPDATE `regions` SET name = ?, continent_id = ? WHERE region_id = ?', [name, continent_id, region_id]);
    return result;
}

exports.delete = async (region_id) => {
    const [result] = await db.query('DELETE FROM `regions` WHERE region_id = ?', [region_id]);
    return result;
}
const db = require('../config/db.js');

exports.getByName = async (region_name) => {
    const [rows] = await db.query('SELECT * FROM `region_areas` WHERE region_name = ?', [region_name]);
    return rows[0];
}

exports.insert = async (region_name, region_area) => {
    const [result] = await db.query('INSERT INTO `region_areas` (region_name, region_area) VALUES (?, ?)', [region_name, region_area]);
    return result;
}

exports.update = async (region_name, region_area) => {
    const [result] = await db.query('UPDATE `region_areas` SET region_area = ? WHERE region_name = ?', [region_area, region_name]);
    return result;
}

exports.delete = async (region_name) => {
    const [result] = await db.query('DELETE FROM `region_areas` WHERE region_name = ?', [region_name]);
    return result;
}
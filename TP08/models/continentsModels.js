const db = require('../config/db.js');

exports.insert = async (name) => {
    const [result] = await db.query('INSERT INTO `continents` (name) VALUES (?)', [name]);
    return result;
}
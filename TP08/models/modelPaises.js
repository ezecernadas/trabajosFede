const db = require('../config/db.js');

exports.getPaises = async () => {
    const [rows] = await db.query('SELECT * FROM `countries`');
    return rows;
}
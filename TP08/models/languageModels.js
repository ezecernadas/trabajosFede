const db = require('../config/db.js');

exports.insert = async (language) => {
    const [result] = await db.query('INSERT INTO `languages`(`language`) VALUES (?)', [language]);
    return result;
}
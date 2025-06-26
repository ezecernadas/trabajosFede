const continents = require('../models/continentsModels');

exports.insert = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await continents.insert(name);
        res.status(201).json({ message: 'Continent inserted successfully', id: result.insertId });
    } catch (error) {
        console.error('Error inserting continent:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
const Paises = require('../models/modelPaises.js');

exports.getPaises = async (req, res)=> {
    try {
        const paises = await Paises.getPaises();
        res.status(200).json(paises);
    } catch (error) {
        console.error("Error al obtener los paises:", error);
        res.status(500).json({ error: "Error al obtener los paises" });
    }
}

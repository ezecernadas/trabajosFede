const express = require('express');
const mysql = require ('mysql2');
const api = express();
const checkAPK = require('./middleware/apiAuth');

require('dotenv').config();
api.use(checkAPK); // Middleware para verificar la API Key

api.use(express.json());
const db = mysql.createConnection({
    host :process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_NAME,
    connectTimeout : 10000,
    keepAliveInitialDelay: 10000,
});

db.connect((error)=>{
    if(error){
        console.error('Error al conectar: ',error);
        return;
    }
    console.log('conexion exitosa');
});

/// Endpoints
api.get('/',(request, result)=>{
    result.send("Hola");
});

// Endpoint para obtener todos los continentes
api.get('/continentes',(request, result)=>{
    db.query("SELECT * FROM `continents`", (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        result.json(resultado);
    })
});

// Endpoint para obtener todos los paises
api.get('/paises',(request, result)=>{
    db.query("SELECT * FROM `countries`", (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        result.json(resultado);
    })
});

// Endpoint para obtener todas las estadisticas de los paises
api.get('/estadisticasPaises',(request, result)=>{
    db.query("SELECT * FROM `country_stats`", (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        result.json(resultado);
    })
});

// Endpoint para obtener todos los lenguajes
api.get('/lenguajes',(request, result)=>{
    db.query("SELECT * FROM `languages`", (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        result.json(resultado);
    })
});

// Endpoint para obtener todas las regiones
api.get('/regiones',(request, result)=>{
    db.query("SELECT * FROM `regions`", (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        result.json(resultado);
    })
});

// Endpoint para obtener todas las areas de una región
api.get('/areasDeRegion',(request, result)=>{
    db.query("SELECT * FROM `region_areas`", (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        result.json(resultado);
    })
});

api.get('/paises/:nombrePais',(request, result)=>{
    const {nombrePais} = request.params;
    db.query("SELECT * FROM `countries` WHERE `name` = ?", [nombrePais], (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        if(resultado.length === 0){
            return result.status(404).json({message:"No se encontró el país"});
        }

        result.json(resultado[0]);
    })
});

api.get('/caso1/:area/:region',(request, result)=>{
    const {area, region} = request.params;
    db.query("SELECT * FROM `countries` WHERE `area` > ? AND `region_id` = ?", [area, region], (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
            return;
        }

        if(resultado == ''){
            return result.status(404).json({message:"No se encontraron países que cumplan con los criterios"});
        }

        result.json(resultado);
    });
});

api.post('/caso2',(request, result)=>{
    const {area, region} = request.body;
    db.query("SELECT * FROM `countries` WHERE `area` > ? AND `region_id` = ?", [area, region], (err,resultado)=>{
        if(err){
            result.status(500).json({message:err.message});
        }

        if(resultado == ''){
            return result.status(404).json({message:"No se encontraron países que cumplan con los criterios"});
        }

        result.json(resultado);
    });
}); 

const PORT = 3000;
api.listen(PORT,()=>{
    console.log("Puerto: ", PORT);
})
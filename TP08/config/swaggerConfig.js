const swaggerJSDoc = require('swagger-jsdoc');
require('dotenv').config();


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ezequiel Cernadas',
      version: '1.0.0',
      description: 'Documentación de la API',
    },
    servers: [
      {
        url: `http://localhost:3000`, //Aca enlazamos con el puerto
      },
    ],
  },
  apis: ['./routes/*.js'], // Donde están las anotaciones de la docu de swagger, el * esta indicando todos los archivos de la carpeta routes
};


const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
const api = require('./app.js');

const PORT = process.env.PORT;
api.listen(PORT,()=>{
    console.log("Puerto: ", PORT);
});
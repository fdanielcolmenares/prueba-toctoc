const app = require('./app');
const http = require('http');
const {PORT} = require('./helpers/config');
const {testConnection, doMigrate} = require('./db/connection');

//Creando servidor
const server = http.createServer(app);

//Probando conexión con la base de datos
const tc = testConnection();

//Creando tablas de la base de datos si no existen
if(tc){
  doMigrate();
}

//levantando servidor
server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
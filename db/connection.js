const {Sequelize} = require('sequelize');
const {DBUSER, DBPASS} = require('../helpers/config');

//Inicializando coneción con la BD
const dbConection = new Sequelize('data-base',DBUSER, DBPASS, {
  dialect: 'sqlite',
  host: './db/database.sqlite',
  logging: false
});

//Método para probar coneción con la BD
const testConnection = async () => {
  try {
    await dbConection.authenticate();
    console.log('Conectado exitosamente a la base de datos.');
    return false;
  } catch (error) {
    console.error('No se pudo establecer conexión con la base de datos:', error);
    return true;
  }
}

//Método para crear tabla en la base de datos
const doMigrate = async () => {
  await dbConection.sync(/*{force: true}*/);
}

module.exports = {
  dbConection,
  testConnection,
  doMigrate
};
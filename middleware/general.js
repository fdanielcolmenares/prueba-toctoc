//Middleware para respuestas a endpoints desconocidos
const unknownEndpoint = (request, response) => {
  response.status(404).send({ 
    success: false, 
    errors: [
      {cod: 'END_UNK', message: 'endpoint desconocido'}
    ] 
  });
}

module.exports = {
  unknownEndpoint
}
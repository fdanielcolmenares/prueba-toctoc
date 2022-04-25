const os = require('os');
const { EventEmitter } = require('events');
const { v4: uuidv4 } = require('uuid');
const {MIN_DISCONNECT} = require('./config');
const {roundToTwoDec, toMB} = require('./utilities');
const agentEventEmitter = new EventEmitter();

//Método para obtener métricas formateadas
const getMetrics = () => {
  const hostName = os.hostname();
  const totalMemory = roundToTwoDec(toMB(os.totalmem()));
  const freeMemory = roundToTwoDec(toMB(os.freemem()));
  const consMemory = totalMemory - freeMemory;

  return {
    uuid: uuidv4(),
    hostName,
    totalMemory,
    freeMemory,
    consMemory
  }
}

//Agente que emite los enventos
const activeAgent = () => {
  let count = 0;

  const timer = setInterval(() => {
    if((MIN_DISCONNECT * 60) == count){
      agentEventEmitter.emit('disconnect', getMetrics());
      clearInterval(timer);
      return;
    }

    //Emitiendo evento de conexión
    if(count == 0){
      agentEventEmitter.emit('connect', getMetrics());
    }

    agentEventEmitter.emit('addMetric', getMetrics());

    count++;
  }, 1000);

  return agentEventEmitter;
}

module.exports = {agentEventEmitter, activeAgent};
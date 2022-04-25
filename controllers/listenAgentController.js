const { EventEmitter } = require('events');
const Metric = require('../models/metric');

/*
* Método para escuchar eventos
*/
const eventListener = (emitter) => {
  //Escucha de la conexión del agente
  emitter.once('connect', async (data) => {
    const newMetric = new Metric({
      ...data,
      timestamp: new Date().getTime(),
      status: 'A',
      type: 'B'
    });

    await newMetric.save();
  });

  //Escucha para agregar metrica a la base de datos
  emitter.on('addMetric', async (data) => {
    const newMetric = new Metric({
      ...data,
      timestamp: new Date().getTime(),
      status: 'A',
      type: 'N'
    });

    await newMetric.save();
  });

  //Escucha para la desconeción del agente
  emitter.on('disconnect', async (data) => {
    const newMetric = new Metric({
      ...data,
      timestamp: new Date().getTime(),
      status: 'A',
      type: 'E'
    });

    await newMetric.save();
  });

  //Escucha para borrar métrica
  emitter.on('removeMetric', async (uuid) => {
    const metric = await Metric.findByPk(uuid);
    metric.update({status: 'T'});
  });
}

module.exports = eventListener;
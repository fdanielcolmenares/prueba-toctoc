const { Op } = require("sequelize");
const moment = require('moment');
const Metric = require('../models/metric');

/*
* Método para respuesta del endpoint de consultar métrica
*/
const getMemory = async (req, res) => {
  //Consultando última métrica registrada para buscar los últimos 30 minutos
  const lastMetric = await Metric.findOne({
    where: {
      status: 'A'
    },
    order: [['createdAt', 'DESC']]
  });  

  //Calculando timestamp de los úlimos 30 minutos
  const end = moment(lastMetric.timestamp);
  const beg = end.subtract(30, 'm').format('x');
  
  //Consultando métricas de los últimos 30 minutos
  const metrics = await Metric.findAll({
    where: {
      status: 'A',
      timestamp	: {
        [Op.gte]: beg
      }
    },
    order: [
      ['createdAt', 'ASC']
    ]
  });

  //Organizando métricas en minutos
  let metricsProcess = [];
  let timeI;
  let timeF;
  for(let i = 0; i < 30; i++){    
    let acumM = 0;
    let timeHM;
    let prom = 0;
    for(let j = 0; j < metrics.length; j++){
      acumM += metrics[j].consMemory;

      //Procesando primera métrica del minuto
      if(j == 0){
        timeI = moment(metrics[j].timestamp);
        timeHM = timeI.format('h:mm');
        prom = acumM;
      }else{
        timeF = moment(metrics[j].timestamp);

        //Condición para saber si ocurrio un cambio de minuto en las metricas
        if(timeI.format('mm') != timeF.format('mm')){
          metrics.splice(0, (j + 1));
          prom = acumM / j;
          break;
        }

        //Condición para saber si es el último minuto con métricas
        if(metrics.length == j + 1){
          metrics.splice(0, metrics.length + 1);
          break;
        }
      } 
    }

    //Condicíon para completar los 30minutos en caso de que no haya 30min de métricas
    if(!metrics.length){
      timeI = timeI ? timeI : moment();
      timeI.add(1, 'm');
      timeHM = timeI.format('h:mm');
    }

    metricsProcess.push({'minute': timeHM, 'mb': prom});
  }

  res.json({
    sucess: true,
    data: {
      'metrics': metricsProcess
    }
  });
}

module.exports = {
  getMemory
}
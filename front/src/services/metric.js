import axios from 'axios';
const baseUrl = 'http://localhost:5000/';

//Método para consultar las métricas de los últimos 30 minutos
const getLast30 = () => {
  const request = axios.get(baseUrl + 'get/resource/memory')
  return request.then(response => response.data);
}

//Método para consultar las métricas por time frames
const getMetricByHour = (type, cant) => {
  const request = axios.get(baseUrl + 'get/resource/memory', {
    params: {
      type,
      cant
    }
  })
  return request.then(response => response.data);
}

export default { 
  getLast30,
  getMetricByHour
}
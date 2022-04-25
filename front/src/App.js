import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BarChart } from './components/chart';
import metrics from './services/metric';

import './App.css';

const App = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    getMetrics();

    const intervalCall = setInterval(getMetrics, 60 * 1000);

    return () => {
      clearInterval(intervalCall);
    };
  }, []);

  //Método para cargar métricas y setear en el estado que maneja la gráfica
  const getMetrics = () => {
    metrics.getLast30()
    .then(data => {
      if(data.sucess){
        setChartData({
          labels: data.data.metrics.map((metric) => metric.minute),
          datasets: [
            {
              label: "Memoria",
              data: data.data.metrics.map((metric) => metric.mb),
              backgroundColor: [
                "#F5AF00"
              ]
            }
          ]
        });
      }
    });
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1 className="text-center">M&eacute;trica de Memoria</h1>
        </Col>
        <Col md={12}>
          <div className="chart-content">
            <BarChart chartData={chartData} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
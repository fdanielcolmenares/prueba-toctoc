const config = require('./helpers/config');
const express = require('express');
const cors = require('cors');
const middleware = require('./middleware/general');
const resources = require('./routes/resources');
const {agentEventEmitter, activeAgent} = require('./helpers/agent');
const eventListener = require('./controllers/listenAgentController');
const app = express();

//Middlewares
app.use(cors());
app.use(express.static('build'));
app.use(express.json());

//LLamar endpoints del API
app.use('/get/resource', resources);

app.use(middleware.unknownEndpoint);

//Iniciando escucha de eventos
eventListener(agentEventEmitter);

//Iniciando el agente
activeAgent();

module.exports = app;
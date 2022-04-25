const {Router} = require('express');
const {getMemory} = require('../controllers/resourceController');

const router = Router();

//Endpoint para obtener métricas
router.get('/memory', getMemory);

module.exports = router;
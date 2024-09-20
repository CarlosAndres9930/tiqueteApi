import Router from 'express';
import { getTiquete, PostTiquete, putTiquete, DeleteTiquete, getTiqueteById, getTiqueteByOrigen,getTotalTiquete,getCountTiquete } from '../controller/tiqueteController.js';

const routesTiquete = Router();

// Rutas para tiquetes
routesTiquete.get('/', getTiquete);
routesTiquete.post('/crear', PostTiquete);
routesTiquete.put('/:id', putTiquete);
routesTiquete.delete('/:id', DeleteTiquete);
routesTiquete.get('/:id', getTiqueteById);
routesTiquete.get('/origen/:origen', getTiqueteByOrigen);
routesTiquete.get('/total/total', getTotalTiquete);
routesTiquete.get('/count/count', getCountTiquete);

export default routesTiquete;

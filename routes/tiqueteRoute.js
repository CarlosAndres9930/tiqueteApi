import Router from 'express'
const routesTiquete = Router()

import { getTiquete, postTiquete, putTiquete, deleteTiquete } from '../controller/tiqueteController.js'

routesTiquete.get('/', getTiquete)
routesTiquete.post('/', postTiquete)
routesTiquete.put('/', putTiquete)
routesTiquete.delete('/:id', deleteTiquete)

export default routesTiquete

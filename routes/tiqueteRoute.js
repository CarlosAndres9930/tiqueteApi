import Router from 'express'
const routesTiquete = Router()

import { getTiquete, PostTiquete, PutTiquete, DeleteTiquete, getTiqueteById } from '../controller/tiqueteController.js'

routesTiquete.get('/', getTiquete)
routesTiquete.post('/crear', PostTiquete)
routesTiquete.put('/:id', PutTiquete)
routesTiquete.delete('/:id', DeleteTiquete)
routesTiquete.get('/:id', getTiqueteById)

export default routesTiquete

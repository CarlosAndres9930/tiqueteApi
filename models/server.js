import express, { json } from 'express';
import dbConnection from '../database/config.js';
import 'dotenv/config';
import routesTiquete from '../routes/tiqueteRoute.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000; // Asignar el puerto
        this.dbConnection();
        this.routes();
        this.listen();
    }

    async dbConnection() {
        await dbConnection();
    }

    routes() {
        this.app.use(json()); // Usar JSON en el cuerpo de la solicitud
        this.app.use('/api/Tiquete', routesTiquete); // Asignar rutas
    }

    listen() {
        this.app.listen(this.port, (err) => {
            if (err) {
                console.error(`Error al iniciar el servidor: ${err.message}`);
                process.exit(1);
            }
            console.log(`Server is running on port: ${this.port}`);
        });
    }
}

export default Server;

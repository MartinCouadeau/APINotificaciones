import express from 'express';
import alertaRoutes from './rutas/rutasAlerta.js';

export class App {
    constructor() {
        this.app = express();
        this.configurarMiddlewares();
        this.configurarRutas();
    }

    configurarMiddlewares() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        

        this.app.use((req, res, next) => {
            console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
            next();
        });
    }

    configurarRutas() {
        this.app.use('/api', alertaRoutes);
        
        this.app.get('/', (req, res) => {
            res.json({
                message: 'Bienvenido a la API de Notificaciones',
                version: '1.0.0',
                endpoints: {
                    'POST /api/alerta': 'Enviar una alerta',
                    'GET /api/status': 'Verificar estado del servicio'
                }
            });
        });

        this.app.use('*', (req, res) => {
            res.status(404).json({
                error: 'Ruta no encontrada',
                path: req.originalUrl
            });
        });
    }

    getApp() {
        return this.app;
    }
}
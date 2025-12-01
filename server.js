import { App } from './src/app.js';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

const app = new App().getApp();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    logger.info(`🚀 Servidor iniciado en puerto ${PORT}`);
    logger.info(`📧 Notificador por defecto: Email`);
    logger.info(`🌐 API disponible en: http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    logger.info('🛑 Apagando servidor...');
    process.exit(0);
});

process.on('SIGTERM', () => {
    logger.info('🛑 Apagando servidor...');
    process.exit(0);
});
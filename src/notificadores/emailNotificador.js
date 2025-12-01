import { INotificador } from './iNotificador.js';
import winston from 'winston';

export class EmailNotificador extends INotificador {
    constructor() {
        super();
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.printf(({ timestamp, level, message }) => {
                    return `${timestamp} [${level.toUpperCase()}]: ${message}`;
                })
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({ filename: 'logs/email-notifications.log' })
            ]
        });
    }

    enviar(mensaje, destinatario) {
        this.logger.info(`📧 EMAIL enviado a: ${destinatario}`);
        this.logger.info(`📝 Contenido: ${mensaje}`);
        this.logger.info('--- Email enviado exitosamente ---');
        
        return {
            exito: true,
            canal: 'email',
            destinatario: destinatario,
            timestamp: new Date().toISOString()
        };
    }
}
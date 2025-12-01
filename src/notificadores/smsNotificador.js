import { INotificador } from './iNotificador.js';
import winston from 'winston';

export class SmsNotificador extends INotificador {
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
                new winston.transports.File({ filename: 'logs/sms-notifications.log' })
            ]
        });
    }

    enviar(mensaje, destinatario) {
        this.logger.info(`📱 SMS enviado a: ${destinatario}`);
        this.logger.info(`💬 Mensaje: ${mensaje}`);
        this.logger.info('--- SMS enviado exitosamente ---');
        
        return {
            exito: true,
            canal: 'sms',
            destinatario: destinatario,
            timestamp: new Date().toISOString()
        };
    }
}
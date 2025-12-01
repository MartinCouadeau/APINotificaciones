import { EmailNotificador } from '../notificadores/emailNotificador.js';
import { SmsNotificador } from '../notificadores/smsNotificador.js';

export class NotificadorFactory {
    static crearNotificador(tipo = 'email') {
        switch (tipo.toLowerCase()) {
            case 'email':
                return new EmailNotificador();
            case 'sms':
                return new SmsNotificador();
            default:
                console.warn(`Tipo de notificador "${tipo}" no reconocido. Usando Email por defecto.`);
                return new EmailNotificador();
        }
    }
}
export class INotificador {
    enviar(mensaje, destinatario) {
        throw new Error('Método enviar debe ser implementado por subclases');
    }
}
export class ServicioDeAlertas {
    constructor(notificador) {
        if (!notificador || typeof notificador.enviar !== 'function') {
            throw new Error('Se requiere un notificador válido que implemente INotificador');
        }
        this.notificador = notificador;
    }

    enviarAlerta(mensaje, destinatario) {
        console.log(`🚀 ServicioDeAlertas: Enviando alerta a ${destinatario}`);
        
        try {
            const resultado = this.notificador.enviar(mensaje, destinatario);
            console.log('✅ Alerta enviada exitosamente');
            return resultado;
        } catch (error) {
            console.error('❌ Error al enviar alerta:', error.message);
            throw error;
        }
    }

    setNotificador(nuevoNotificador) {
        this.notificador = nuevoNotificador;
    }
}
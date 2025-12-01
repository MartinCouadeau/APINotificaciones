import express from 'express';
import { NotificadorFactory } from '../config/notificadorFactory.js';
import { ServicioDeAlertas } from '../servicios/servicioAlerta.js';

const router = express.Router();

// Servicio por defecto con EmailNotificador
const notificadorPorDefecto = NotificadorFactory.crearNotificador('email');
const servicioAlertas = new ServicioDeAlertas(notificadorPorDefecto);

// Endpoint para enviar alerta
router.post('/alerta', (req, res) => {
    try {
        const { mensaje, destinatario, canal = 'email' } = req.body;

        if (!mensaje || !destinatario) {
            return res.status(400).json({
                error: 'Los campos "mensaje" y "destinatario" son requeridos'
            });
        }

        if (canal !== 'email') {
            const notificador = NotificadorFactory.crearNotificador(canal);
            servicioAlertas.setNotificador(notificador);
        }

        const resultado = servicioAlertas.enviarAlerta(mensaje, destinatario);

        res.json({
            success: true,
            data: resultado,
            message: 'Alerta enviada exitosamente'
        });

    } catch (error) {
        console.error('Error en endpoint /alerta:', error);
        res.status(500).json({
            success: false,
            error: 'Error interno del servidor al enviar la alerta'
        });
    }
});

router.get('/status', (req, res) => {
    res.json({
        status: 'API de Notificaciones funcionando correctamente',
        timestamp: new Date().toISOString(),
        canalesDisponibles: ['email', 'sms']
    });
});

export default router;
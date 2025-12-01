import request from 'supertest';
import express from 'express';
import alertaRoutes from '../rutas/rutasAlerta.js';

const app = express();
app.use(express.json());
app.use('/api', alertaRoutes);

describe('API Routes', () => {
  describe('POST /api/alerta', () => {
    test('debería enviar alerta por email correctamente', async () => {
      const payload = {
        mensaje: 'Alerta de prueba',
        destinatario: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.canal).toBe('email');
      expect(response.body.data.destinatario).toBe(payload.destinatario);
      expect(response.body.message).toBe('Alerta enviada exitosamente');
    });

    test('debería enviar alerta por SMS cuando se especifica canal', async () => {
      const payload = {
        mensaje: 'Alerta SMS',
        destinatario: '+1234567890',
        canal: 'sms'
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.canal).toBe('sms');
    });

    test('debería retornar error 400 si falta mensaje', async () => {
      const payload = {
        destinatario: 'test@example.com'
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload)
        .expect(400);

      expect(response.body.error).toContain('mensaje');
    });

    test('debería retornar error 400 si falta destinatario', async () => {
      const payload = {
        mensaje: 'Alerta sin destinatario'
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload)
        .expect(400);

      expect(response.body.error).toContain('destinatario');
    });

    test('debería manejar campos vacíos', async () => {
      const payload = {
        mensaje: '',
        destinatario: ''
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload)
        .expect(400);

      expect(response.body.error).toBeDefined();
    });
  });

  describe('GET /api/status', () => {
    test('debería retornar estado del servicio', async () => {
      const response = await request(app)
        .get('/api/status')
        .expect(200);

      expect(response.body.status).toBe('API de Notificaciones funcionando correctamente');
      expect(response.body.timestamp).toBeDefined();
      expect(response.body.canalesDisponibles).toEqual(['email', 'sms']);
    });
  });
});
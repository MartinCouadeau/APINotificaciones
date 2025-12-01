import request from 'supertest';
import { App } from '../app.js';

describe('API E2E Tests', () => {
  let app;

  beforeAll(() => {
    const expressApp = new App().getApp();
    app = expressApp;
  });

  describe('Flujo completo de notificaciones', () => {
    test('debería completar flujo de notificación por email', async () => {
      const payload = {
        mensaje: 'Mensaje de prueba E2E',
        destinatario: 'e2e@test.com',
        canal: 'email'
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.canal).toBe('email');
    });

    test('debería completar flujo de notificación por SMS', async () => {
      const payload = {
        mensaje: 'Mensaje SMS E2E',
        destinatario: '+1234567890',
        canal: 'sms'
      };

      const response = await request(app)
        .post('/api/alerta')
        .send(payload);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.canal).toBe('sms');
    });
  });

  describe('Ruta raíz', () => {
    test('debería retornar documentación en ruta raíz', async () => {
      const response = await request(app)
        .get('/')
        .expect(200);

      expect(response.body.message).toBe('Bienvenido a la API de Notificaciones');
      expect(response.body.endpoints).toBeDefined();
    });
  });

  describe('Manejo de rutas no encontradas', () => {
    test('debería retornar 404 para rutas inexistentes', async () => {
      const response = await request(app)
        .get('/api/ruta-inexistente')
        .expect(404);

      expect(response.body.error).toBe('Ruta no encontrada');
    });
  });
});
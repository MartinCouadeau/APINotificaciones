import { EmailNotificador } from '../notificadores/emailNotificador.js';
import { jest } from '@jest/globals';

describe('EmailNotificador', () => {
  let emailNotificador;
  let consoleSpy;

  beforeEach(() => {
    emailNotificador = new EmailNotificador();
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    consoleSpy.mockRestore();
  });

  test('debería crear instancia correctamente', () => {
    expect(emailNotificador).toBeInstanceOf(EmailNotificador);
    expect(emailNotificador.logger).toBeDefined();
  });

  test('debería enviar email correctamente', () => {
    const mensaje = 'Test message';
    const destinatario = 'test@example.com';

    const resultado = emailNotificador.enviar(mensaje, destinatario);

    expect(resultado).toEqual({
      exito: true,
      canal: 'email',
      destinatario: destinatario,
      timestamp: expect.any(String)
    });
  });

  test('debería manejar mensajes vacíos', () => {
    const mensaje = '';
    const destinatario = 'test@example.com';

    const resultado = emailNotificador.enviar(mensaje, destinatario);

    expect(resultado.exito).toBe(true);
    expect(resultado.destinatario).toBe(destinatario);
  });
});
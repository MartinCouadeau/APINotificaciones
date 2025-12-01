import { SmsNotificador } from '../notificadores/smsNotificador.js';

describe('SmsNotificador', () => {
  let smsNotificador;

  beforeEach(() => {
    smsNotificador = new SmsNotificador();
  });

  test('debería crear instancia correctamente', () => {
    expect(smsNotificador).toBeInstanceOf(SmsNotificador);
    expect(smsNotificador.logger).toBeDefined();
  });

  test('debería enviar SMS correctamente', () => {
    const mensaje = 'Test SMS';
    const destinatario = '+1234567890';

    const resultado = smsNotificador.enviar(mensaje, destinatario);

    expect(resultado).toEqual({
      exito: true,
      canal: 'sms',
      destinatario: destinatario,
      timestamp: expect.any(String)
    });
  });

  test('debería manejar números de teléfono internacionales', () => {
    const mensaje = 'Test internacional';
    const destinatario = '+34-123-456-789';

    const resultado = smsNotificador.enviar(mensaje, destinatario);

    expect(resultado.exito).toBe(true);
    expect(resultado.destinatario).toBe(destinatario);
  });
});
import { INotificador } from '../notificadores/iNotificador.js';

describe('INotificador', () => {
  test('debería lanzar error al llamar enviar sin implementar', () => {
    const notificador = new INotificador();
    
    expect(() => {
      notificador.enviar('mensaje', 'destinatario');
    }).toThrow('Método enviar debe ser implementado por subclases');
  });
});
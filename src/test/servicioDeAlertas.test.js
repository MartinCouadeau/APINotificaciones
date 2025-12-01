import { ServicioDeAlertas } from '../servicios/servicioAlerta.js';
import { jest } from '@jest/globals';

const mockNotificador = {
  enviar: jest.fn()
};

describe('ServicioDeAlertas', () => {
  let servicioAlertas;

  beforeEach(() => {
    servicioAlertas = new ServicioDeAlertas(mockNotificador);
    mockNotificador.enviar.mockClear();
  });

  test('debería crear instancia con notificador válido', () => {
    expect(servicioAlertas).toBeInstanceOf(ServicioDeAlertas);
    expect(servicioAlertas.notificador).toBe(mockNotificador);
  });

  test('debería lanzar error si no se proporciona notificador', () => {
    expect(() => {
      new ServicioDeAlertas(null);
    }).toThrow('Se requiere un notificador válido');
  });

  test('debería lanzar error si notificador no tiene método enviar', () => {
    expect(() => {
      new ServicioDeAlertas({});
    }).toThrow('Se requiere un notificador válido');
  });

  test('debería enviar alerta correctamente', () => {
    const mensaje = 'Alerta de prueba';
    const destinatario = 'test@example.com';
    const mockResultado = { exito: true, canal: 'email' };
    
    mockNotificador.enviar.mockReturnValue(mockResultado);

    const resultado = servicioAlertas.enviarAlerta(mensaje, destinatario);

    expect(mockNotificador.enviar).toHaveBeenCalledWith(mensaje, destinatario);
    expect(mockNotificador.enviar).toHaveBeenCalledTimes(1);
    expect(resultado).toBe(mockResultado);
  });

  test('debería cambiar notificador correctamente', () => {
    const nuevoMockNotificador = {
      enviar: jest.fn()
    };

    servicioAlertas.setNotificador(nuevoMockNotificador);

    expect(servicioAlertas.notificador).toBe(nuevoMockNotificador);
  });

  test('debería manejar errores al enviar alerta', () => {
    const mensaje = 'Alerta de prueba';
    const destinatario = 'test@example.com';
    const error = new Error('Error de red');
    
    mockNotificador.enviar.mockImplementation(() => {
      throw error;
    });

    expect(() => {
      servicioAlertas.enviarAlerta(mensaje, destinatario);
    }).toThrow('Error de red');
  });
});
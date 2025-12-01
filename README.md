# APINotificaciones

Este proyecto implementa una API REST en Node.js + Express que permite:

- Envío de notificaciones a usuarios mediante diferentes canales.

- Arquitectura desacoplada usando el patrón de inyección de dependencias.

- Implementación de notificaciones por Email y SMS.

- Fácil extensibilidad para agregar nuevos canales de notificación.


## 📂 Estructura del Proyecto

```
apiNotificaciones/
├── src/
│   ├── notificadores/
│   │   ├── INotificador.js
│   │   ├── EmailNotificador.js
│   │   └── SmsNotificador.js
│   ├── servicios/
│   │   └── ServicioDeAlertas.js
│   ├── config/
│   │   └── notificadorFactory.js
│   ├── test/
│   │   ├── emailNotificador.test.js/
│   │   ├── end2end.test.js/
│   │   ├── iNotificador.test.js/
│   │   ├── rutasAlerta.test.js/
│   │   └── servicioDeAlertas.test.js/
│   │   └── smsNotificador.test.js/
│   │ 
│   ├── routes/
│   │   └── alertaRoutes.js
│   └── app.js
├── package.json
└── server.js
```

## 🚀 Instalación

### 1️⃣ Clonar el repositorio
```bash
git clone <url-del-repo>
cd APINotificaciones
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar la clave JWT y valores de Auth0

La API no requiere configuración externa. Por defecto usa:

- EmailNotificador como canal predeterminado

- Winston para logging

- Puerto 3001 (configurable via variable de entorno PORT)


## ▶️ Ejecutar el proyecto

```bash
npm start
```

## 📋 La API quedará disponible en:
```bash
http://localhost:3001
```

# 📊 Tests

 La suite de tests incluye:

- Tests Unitarios: Para cada notificador y servicio

- Tests de Integración: Para las rutas de Express

- Tests E2E: Flujos completos de notificación

## Ejecutar todos los tests
```bash
npm test
```

## Ejecutar un test en particular
```bash
npm run test emailNotificador.test
```

## Ejecutar tests en modo watch
```bash
npm run test:watch
```


# 📧 Endpoints de Notificaciones

## Envío de Alertas

```bash
## POST /api/alerta
- url: http://localhost:3001/api/alerta
- descripcion: Envía una alerta al destinatario especificado mediante el canal elegido
- requestBody:
  - required: true
  - content:
      application/json:
        {
            "mensaje": "¡Alerta importante del sistema!",
            "destinatario": "usuario@ejemplo.com",
            "canal": "email"
        }
- parametros opcionales:
  - canal: "email" | "sms" (default: "email")
- respuesta:
  - 200:
    {
        "success": true,
        "data": {
            "exito": true,
            "canal": "email",
            "destinatario": "usuario@ejemplo.com",
            "timestamp": "2024-01-15T10:30:00.000Z"
        },
        "message": "Alerta enviada exitosamente"
    }
  - 400:
    {
        "error": "Los campos 'mensaje' y 'destinatario' son requeridos"
    }
  - 500:
    {
        "success": false,
        "error": "Error interno del servidor al enviar la alerta"
    }
```

```bash
## GET /api/status
- url: http://localhost:3001/api/status
- descripcion: Verifica el estado del servicio y los canales disponibles
- respuesta:
  - 200:
    {
        "status": "API de Notificaciones funcionando correctamente",
        "timestamp": "2024-01-15T10:30:00.000Z",
        "canalesDisponibles": ["email", "sms"]
    }
```

---

# 🔧 Uso de Ejemplos

```bash
curl -X POST http://localhost:3001/api/alerta \
  -H "Content-Type: application/json" \
  -d '{
    "mensaje": "¡Alerta importante del sistema!",
    "destinatario": "usuario@ejemplo.com"
  }'
```

```bash
curl -X POST http://localhost:3000/api/alerta \
  -H "Content-Type: application/json" \
  -d '{
    "mensaje": "Alerta urgente: Sistema caído",
    "destinatario": "+1234567890",
    "canal": "sms"
  }'
```
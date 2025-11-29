# Glow Studio

## Descripción del Proyecto

**Glow Studio** es una aplicación web de recomendaciones personalizadas de productos de skincare basada en el análisis del tipo de piel del usuario. La plataforma conecta a los usuarios con productos reales de cuidado de la piel mediante integración con APIs de tiendas especializadas, guiándolos hacia las opciones más adecuadas para sus necesidades específicas.

### Características Principales

- **Análisis de Tipo de Piel**: Los usuarios pueden seleccionar su tipo de piel (atópica, propensa al acné, etc.) para recibir recomendaciones personalizadas.
- **Sistema de Recomendaciones Inteligente**: Algoritmo que analiza ingredientes de productos contra las necesidades específicas de cada tipo de piel.
- **Catálogo de Productos**: Base de datos extensa con productos de marcas reconocidas, incluyendo información detallada de ingredientes.
- **Sistema de Reseñas**: Los usuarios pueden dejar comentarios y calificaciones sobre los productos.
- **Panel de Administración**: Herramientas para administradores que incluyen estadísticas, gestión de usuarios y análisis de datos.
- **Autenticación Segura**: Sistema completo de registro/login con JWT y gestión de sesiones.

## Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **TypeScript** - Tipado estático para JavaScript
- **Prisma ORM** - Manejo de base de datos
- **JWT** (jsonwebtoken) - Autenticación y autorización
- **bcrypt** - Hash de contraseñas

### Frontend
- **React** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de estilos
- **React Router** - Enrutamiento del lado del cliente

### Base de Datos
- **NeonDB** - PostgreSQL serverless en la nube
- **Prisma** - ORM para modelado y migraciones

### Servicios Externos
- **RapidAPI** - Integración con API de Sephora para catálogo de productos
- **UptimeRobot** - Monitoreo y keep-alive del backend

### Hosting y Deployment
- **Vercel** - Hosting del frontend (https://glow-studio-sand.vercel.app/)
- **Render** - Hosting del backend (https://glow-studio.onrender.com/)

## Consideraciones de Rendimiento

> **Nota Importante sobre Latencia**: Este proyecto utiliza servicios en el tier gratuito tanto para el backend (Render) como para la base de datos (NeonDB) y el frontend (Vercel), lo que puede resultar en:
> 
> - **Variabilidad geográfica**: Los servicios están hosteados en **US East (N. Virginia)**. Los usuarios fuera de Estados Unidos experimentarán mayor latencia.
> - **Recursos limitados**: El tier gratuito tiene límites de CPU, memoria y conexiones simultáneas.

## Estructura del Proyecto

```
glow-studio/
├── apps/
│   ├── api/              # Backend (Express + Prisma)
│   │   ├── src/
│   │   │   ├── routers/      # Endpoints de la API
│   │   │   ├── services/     # Lógica de negocio
│   │   │   ├── middleware/   # Autenticación y validación
│   │   │   ├── db/           # Configuración de Prisma
│   │   │   └── cron/         # Tareas programadas
│   │   └── package.json
│   └── ui/               # Frontend (React + Vite)
│       ├── src/
│       │   ├── pages/        # Componentes de páginas
│       │   ├── components/   # Componentes reutilizables
│       │   ├── config/       # Configuración de API
│       │   └── assets/       # Recursos estáticos
│       ├── vercel.json       # Configuración de Vercel
│       └── package.json
```

## Características del Sistema

### Autenticación
- Registro de usuarios con validación de datos
- Login seguro con JWT (Access Token + Refresh Token)
- Middleware de autenticación para rutas protegidas
- Roles de usuario (Usuario/Administrador)
- Soft delete de usuarios con período de gracia de 30 días

### Gestión de Productos
- Importación automática desde la API de Sephora
- Análisis de ingredientes
- Categorización por tipo de producto
- Sistema de calificaciones y reseñas

### Sistema de Recomendaciones
- Algoritmo que relaciona ingredientes con tipos de piel
- Filtrado por efecto positivo/negativo de ingredientes
- Actualización automática basada en el perfil del usuario
- Recomendaciones categorizadas por tipo de producto

### Panel de Administrador
- Estadísticas de uso
- Gestión de usuarios
- Análisis de productos más recomendados
- Gestión de usuarios eliminados (soft delete con restauración)

## Equipo de Desarrollo
Proyecto desarrollado como parte de la materia Prácticas Profesionalizantes dentro del Ins. Ind. Luis A. Huergo.

Integrantes:
- Valentina Carera
- Kiara Micaela Koo
- Lucia Saint Martin

---

Nota: Este proyecto fue desarrollado como parte de un trabajo académico y no está destinado para uso comercial.


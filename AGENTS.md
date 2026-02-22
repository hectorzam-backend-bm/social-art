# Agent Instructions & Context (AGENTS.md)

¡Bienvenido, Agente de IA! Este archivo proporciona el contexto necesario, las directrices arquitectónicas y los planes futuros para el repositorio **Social Art**, con el fin de ayudarte a asistir de manera efectiva.

## Propósito del Proyecto

Este repositorio es una **aplicación de demostración** diseñada principalmente como un entorno de pruebas para implementar y experimentar con **"skills"** (habilidades) para agentes de IA en el futuro. Un "skill" en este contexto se refiere a un conjunto modular de instrucciones, flujos de trabajo o conocimientos especializados que un agente de IA puede cargar para realizar tareas de dominio específicas.

Antes de implementar esas habilidades, estamos construyendo una aplicación base funcional: **una plataforma de exploración de arte**.

## Características Principales de la Aplicación

1. **Autenticación Básica:** Los usuarios pueden registrarse, iniciar sesión y gestionar sus sesiones de forma segura.
2. **Consumo de API de Arte:** La aplicación obtiene y muestra obras de arte de una API pública externa (por ejemplo, The Art Institute of Chicago API o similar).
3. **Sistema de Favoritos:** Los usuarios autenticados pueden guardar obras de arte específicas en su lista personal de "favoritos", la cual se guarda en la base de datos.

## Stack Tecnológico y Directrices

Al generar código, refactorizar o planificar tareas, sigue estrictamente el siguiente stack y convenciones:

- **TanStack Start:** Utilízalo para todas las características full-stack de React, enrutamiento basado en archivos (`src/routes`) y _server functions_.
- **Shadcn UI & Tailwind CSS:** Usa estos para todos los componentes de la interfaz de usuario y el estilado. No introduzcas archivos CSS personalizados a menos que sea absolutamente necesario. Confía en las clases de utilidad y en los componentes existentes de Shadcn.
- **Better Auth:** Empléalo para manejar todos los flujos de autenticación (inicio de sesión, registro, validación de sesiones).
- **Drizzle ORM:** Úsalo para todas las interacciones con la base de datos. Asegúrate de que los esquemas estén correctamente tipados y de generar migraciones cuando los esquemas cambien.
- **Bun:** Es el runtime y administrador de paquetes principal del proyecto. Usa `bun` para ejecutar scripts e instalar dependencias.

## Hoja de Ruta de Desarrollo y Tareas para Agentes

Si se te pide que ayudes a desarrollar la aplicación, aquí está la secuencia general de las próximas tareas esperadas:

1. **Integración de Drizzle y Better Auth:** Asegurar de que el esquema de la base de datos contenga las tablas necesarias para Better Auth (Users, Sessions, Accounts) y nuestra tabla personalizada de `Favorites`.
2. **Implementar UI de Autenticación:** Construir las páginas de inicio de sesión y registro utilizando los componentes de Shadcn UI conectados a Better Auth.
3. **Integrar la API de Arte:** Crear _server functions_ (a través de TanStack Start) para obtener los datos de las obras de arte de manera segura y eficiente.
4. **Construir la Galería y UI de Favoritos:** Renderizar las obras de arte en una cuadrícula/lista e implementar el botón "Agregar a Favoritos", el cual activa una mutación en la base de datos mediante una _server function_.
5. **Implementar "Skills" (Fase Futura):** Crear archivos `.md` o configuraciones especializadas que permitan a los agentes gestionar de forma autónoma partes específicas de este stack.

## Reglas Generales para Agentes

- **Leer Antes de Escribir:** Siempre usa las herramientas `read` o `glob` para entender la configuración actual (como `vite.config.ts`, `drizzle.config.ts`, `package.json`) antes de asumir dependencias o estructuras.
- **Seguir Patrones Idiomáticos:** Revisa el código existente en `src/routes` y `src/components` para coincidir con el estilo de codificación y la arquitectura del proyecto.
- **Uso Seguro de Server Functions:** Al escribir _server functions_ de TanStack Start, asegúrate de realizar comprobaciones de autenticación del usuario antes de ejecutar operaciones sensibles en la base de datos (como agregar o eliminar un favorito).

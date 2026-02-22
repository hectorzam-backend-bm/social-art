# Social Art 🎨

Social Art es una aplicación de demostración diseñada para explorar e implementar **"skills"** (habilidades) para Agentes de IA (que se implementarán más adelante). Actualmente, la aplicación sirve como una plataforma base que incluye un sistema de login básico, integración con una API externa de obras de arte, y la capacidad para que los usuarios guarden sus piezas favoritas.

## Características

- **Autenticación:** Sistema de login básico y seguro.
- **Explorador de Arte:** Consume y muestra datos de una API pública de obras de arte.
- **Favoritos:** Los usuarios autenticados pueden guardar y gestionar sus obras de arte favoritas.
- **Skills para Agentes de IA (Planeado):** Este repositorio actuará como un entorno de pruebas para implementar habilidades modulares y agenticas que automaticen y mejoren los flujos de trabajo de desarrollo.

## Tech Stack

Este proyecto está construido con herramientas modernas de desarrollo web:

- **Framework:** [TanStack Start](https://tanstack.com/start)
- **UI Components:** [Shadcn UI](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Autenticación:** [Better Auth](https://www.better-auth.com/)
- **ORM / Base de Datos:** [Drizzle ORM](https://orm.drizzle.team/)
- **Package Manager / Runtime:** [Bun](https://bun.sh/)

## Empezando (Getting Started)

### Prerrequisitos

- Asegúrate de tener [Bun](https://bun.sh/) instalado en tu máquina.
- Configura tu base de datos según lo indicado en `drizzle.config.ts`.

### Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/social-art.git
   cd social-art
   ```

2. Instala las dependencias:

   ```bash
   bun install
   ```

3. Configura las variables de entorno:
   Copia el archivo `.env.example` a `.env.local` (o créalo) y define la URL de tu base de datos y los secretos de Better Auth.

   ```bash
   bunx @better-auth/cli secret
   ```

4. Ejecuta las migraciones de la base de datos:

   ```bash
   bunx drizzle-kit push
   ```

5. Inicia el servidor de desarrollo:
   ```bash
   bun --bun run dev
   ```

## Estructura del Proyecto

- `src/routes/` - Enrutamiento basado en archivos de TanStack Router.
- `src/components/` - Componentes de Shadcn UI y componentes de React personalizados.
- `drizzle/` - Esquemas y migraciones de la base de datos.

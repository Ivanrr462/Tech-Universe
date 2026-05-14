<div align="center">

# TechUniverse

### Trabajo de Fin de Grado — Desarrollo de Aplicaciones Web

E-commerce tecnológico desarrollado con arquitectura desacoplada, micro-frontends y despliegue automatizado en AWS.

<br/>

![Angular](https://img.shields.io/badge/Angular_21-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![Laravel](https://img.shields.io/badge/Laravel_12-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white)
![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![Terraform](https://img.shields.io/badge/Terraform-%237B42BC.svg?style=for-the-badge&logo=terraform&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-web-services&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-%232088FF.svg?style=for-the-badge&logo=github-actions&logoColor=white)

[![Despliegue del código](https://github.com/Ivanrr462/Tech-Universe/actions/workflows/codedeploy.yml/badge.svg)](https://github.com/Ivanrr462/Tech-Universe/actions/workflows/codedeploy.yml)

<br/>

[Demostración en vídeo](https://drive.google.com/file/d/1ALMScHhkEyg9Yz9KpZ_TAwLdgAdaIH_u/view?usp=sharing) · [Documentación API](https://ivan123.alwaysdata.net/api/documentation/) · [Diseño Figma](https://www.figma.com/design/CdztUWth7lbVUKpVMSYNvb/Proyecto-Intermodular?node-id=0-1&p=f&t=3Ktj0fuLzQOQryqP-0)

</div>

---

## Índice

- [Descripción del proyecto](#descripción-del-proyecto)
- [Equipo](#equipo)
- [Arquitectura general](#arquitectura-general)
- [Stack tecnológico](#stack-tecnológico)
- [Módulos del proyecto](#módulos-del-proyecto)
  - [Frontend Angular](#frontend-angular)
  - [Micro-frontends React](#micro-frontends-react)
  - [API REST Laravel](#api-rest-laravel)
  - [Infraestructura y despliegue](#infraestructura-y-despliegue)
- [Pipeline CI/CD](#pipeline-cicd)
- [Puesta en marcha local](#puesta-en-marcha-local)
- [Estrategia de ramas](#estrategia-de-ramas)
- [Diseño y documentación](#diseño-y-documentación)

---

## Descripción del proyecto

**TechUniverse** es un e-commerce de productos tecnológicos desarrollado como Trabajo de Fin de Grado del Ciclo Formativo de Grado Superior en Desarrollo de Aplicaciones Web.

El proyecto abarca el ciclo completo de una aplicación web moderna: desde el diseño y maquetación hasta el despliegue automatizado en la nube, pasando por el desarrollo de una API REST, un panel de administración y una tienda online con las funcionalidades propias de un e-commerce real.

El objetivo principal es demostrar la integración de distintas tecnologías del ecosistema web actual en un producto cohesionado, aplicando buenas prácticas de arquitectura, seguridad y automatización:

- **Separación de responsabilidades** entre frontend, backend y base de datos, cada uno en su propia instancia EC2.
- **Arquitectura micro-frontend**: componentes React integrados en la aplicación Angular como unidades independientes compiladas.
- **Infraestructura como código** con Terraform, que aprovisiona y destruye la arquitectura completa de forma reproducible.
- **CI/CD completo** mediante GitHub Actions, que ejecuta el ciclo Terraform → build → deploy en cada push a `main` o `develop`.
- **Almacenamiento en la nube** de imágenes de productos en Cloudflare R2 (compatible con S3).

---

## Equipo

| Nombre | Rol principal |
|---|---|
| Iván Ríos Raya | Backend (Laravel), Infraestructura (Terraform + AWS), CI/CD |
| Alexander Sánchez Jara | Frontend (Angular), Micro-frontends (React), Diseño UI/UX |

---

## Arquitectura general

```
                        Internet
                           │
                    ┌──────▼──────┐
                    │  FrontEnd   │  EC2 · Apache · Angular SPA
                    │  (HTTPS)    │  DuckDNS + Let's Encrypt
                    └──────┬──────┘
                           │ Proxy inverso (rutas /api, /admin, /storage)
                    ┌──────▼──────┐
                    │   BackEnd   │  EC2 · Apache · Laravel 11
                    │             │  Sanctum · Filament · Swagger
                    └──────┬──────┘
                           │ MySQL (red privada)
                    ┌──────▼──────┐
                    │  Base de    │  EC2 · MySQL 8
                    │   datos     │
                    └─────────────┘

        ┌──────────────┐          ┌───────────────────┐
        │  Bastion Host│          │  Cloudflare R2    │
        │  (acceso SSH)│          │  (imágenes s3-SDK)│
        └──────────────┘          └───────────────────┘
```

El frontend actúa como punto de entrada único. Sirve la SPA de Angular y redirige mediante proxy inverso las llamadas a la API y al panel de administración hacia el backend, que se encuentra en la red privada sin exposición directa a internet.

---

## Stack tecnológico

### Frontend
| Tecnología | Versión | Propósito |
|---|---|---|
| Angular | 21 | Framework principal de la SPA |
| Angular Material | 21 | Componentes UI accesibles |
| Tailwind CSS | 3 | Estilos utilitarios |
| TypeScript | 5.9 | Tipado estático |
| RxJS | 7.8 | Programación reactiva y gestión de estado |
| Lucide Angular | latest | Iconografía |

### Micro-frontends
| Tecnología | Versión | Propósito |
|---|---|---|
| React | 18 | Componentes independientes (chatbot, theme toggle) |
| Vite | 6 | Bundler y compilación de Web Components |

### Backend
| Tecnología | Versión | Propósito |
|---|---|---|
| Laravel | 11 | Framework PHP y API REST |
| PHP | 8.3 | Lenguaje de servidor |
| MySQL | 8 | Base de datos relacional |
| Laravel Sanctum | — | Autenticación token-based (JWT) |
| Filament | 3 | Panel de administración |
| L5-Swagger | — | Documentación OpenAPI 3.0 |
| Flysystem AWS S3 v3 | 3 | Integración con Cloudflare R2 |

### Infraestructura
| Tecnología | Propósito |
|---|---|
| Terraform | Aprovisionamiento de infraestructura como código |
| AWS EC2 | Máquinas virtuales (frontend, backend, base de datos, bastion) |
| AWS Route 53 | DNS privado interno entre instancias |
| AWS CodeDeploy | Despliegue automatizado de artefactos |
| AWS S3 | Almacenamiento del estado de Terraform y artefactos de deploy |
| GitHub Actions | Pipeline CI/CD |
| Certbot + Let's Encrypt | Certificados SSL/TLS automatizados |
| DuckDNS | Dominio dinámico gratuito (`techuniverse.duckdns.org`) |
| Cloudflare R2 | Almacenamiento de imágenes (compatible con S3) |

---

## Módulos del proyecto

### Frontend Angular

SPA completa de e-commerce desarrollada en **Angular 21** con arquitectura standalone y lazy loading en todas las rutas.

**Funcionalidades implementadas:**
- Catálogo de productos con filtrado por categoría y paginación
- Buscador global con resultados en tiempo real
- Página de detalle de producto con especificaciones técnicas
- Carrito de compra con gestión de cantidades y eliminación
- Lista de deseos sincronizada con la API
- Autenticación (login y registro) con persistencia de sesión via JWT
- Tema claro/oscuro persistido en `localStorage`
- Sección de ofertas y novedades en la portada

**Estructura de rutas:**

| Ruta | Descripción | Protegida |
|---|---|---|
| `/` | Portada con destacados, ofertas y novedades | No |
| `/category/:category` | Listado por categoría con paginación | No |
| `/product/:id` | Detalle de producto | No |
| `/search` | Resultados de búsqueda | No |
| `/auth` | Login y registro | No |
| `/cart` | Carrito de compra | Sí |
| `/checkout` | Finalización de compra | Sí |
| `/wishlist` | Lista de deseos | Sí |

> Documentación detallada: [`Angular-frontend/README.md`](./Angular-frontend/README.md)

---

### Micro-frontends React

Componentes desarrollados en **React 18** y compilados como **Web Components** para integrarse dentro de la aplicación Angular sin acoplamiento.

| Componente | Descripción |
|---|---|
| **Chatbot** | Asistente de ayuda al usuario con interfaz de chat. Se adapta al tema claro/oscuro activo. |
| **Theme Toggle** | Switch de tema claro/oscuro que emite eventos al sistema de temas de Angular. |

La comunicación entre los componentes React y Angular se realiza mediante eventos personalizados del DOM (`CustomEvent`), sin dependencia directa entre ambos frameworks. Cada componente se registra como un elemento HTML personalizado (`<app-chatbot>`, `<app-theme-toggle>`).

---

### API REST Laravel

Backend desarrollado en **Laravel 11** que expone una API REST consumida por el frontend y gestiona el panel de administración.

**Endpoints principales:**

| Recurso | Ruta base | Auth |
|---|---|---|
| Productos | `/api/productos` | Parcial |
| Categorías | `/api/categorias` | No |
| Usuarios | `/api/usuarios` | Sí |
| Carrito | `/api/cesta` | Sí |
| Lista de deseos | `/api/deseos` | Sí |
| Autenticación | `/api/login`, `/api/register`, `/api/logout` | — |

**Características destacadas:**
- Autenticación basada en tokens con **Laravel Sanctum**
- Control de acceso por roles (`admin` / `usuario`)
- Panel de administración con **Filament** para gestión de productos, categorías y usuarios
- Subida y almacenamiento de imágenes en **Cloudflare R2** mediante el driver S3 de Laravel
- Documentación interactiva generada con **Swagger/OpenAPI 3.0**

> Documentación API en producción: [https://ivan123.alwaysdata.net/api/documentation/](https://ivan123.alwaysdata.net/api/documentation/)

> Documentación detallada: [`Readme`](./techuniverse-api/README.md)

---

### Infraestructura y despliegue

La infraestructura completa está definida como código con **Terraform** y se aprovisiona automáticamente desde el pipeline de CI/CD.

**Instancias EC2 aprovisionadas:**

| Instancia | Rol | Grupos de seguridad |
|---|---|---|
| `Bastion` | Acceso SSH a la red privada | Acceso SSH público |
| `FrontEnd` | SPA Angular + proxy inverso Apache | HTTP/HTTPS público, SSH desde Bastion |
| `BackEnd` | API Laravel + panel Filament | HTTP desde FrontEnd, SSH desde Bastion |
| `db` | MySQL 8 | MySQL desde BackEnd, SSH desde BackEnd |

**Userdata por instancia:**
- **FrontEnd**: instala Apache, registra el dominio en DuckDNS, obtiene certificado SSL con Certbot y configura el proxy inverso hacia el backend.
- **BackEnd**: instala Apache + PHP 8.3, genera el fichero `.env.base` con las credenciales inyectadas por Terraform (DB, Cloudflare R2) e instala el agente de CodeDeploy.
- **db**: instala MySQL 8 y crea el usuario y la base de datos inicial.

Las credenciales sensibles (`DB_ROOT_PASSWORD`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY`, `DUCKDNS_TOKEN`) se almacenan como **secrets en GitHub** y se pasan a Terraform mediante variables de entorno `TF_VAR_*`, sin exponerse en ningún fichero del repositorio.

---

## Pipeline CI/CD

El pipeline se activa en cada push a `main` o `develop` que modifique código en `techuniverse-api/`, `Angular-frontend/`, `React-components/` o `despliegue-aws/`.

```
Push a main/develop
        │
        ▼
┌───────────────────┐
│  1. Terraform     │  terraform init → validate → plan → apply
│     Apply         │  Recrea instancias FrontEnd y BackEnd
└────────┬──────────┘
         │
    ┌────┴────┐
    ▼         ▼
┌────────┐ ┌──────────┐
│ 2a.    │ │ 2b.      │  (en paralelo)
│ Deploy │ │ Deploy   │
│ Backend│ │ Frontend │
└────────┘ └──────────┘
    │             │
    │  composer install + zip → S3 → CodeDeploy
    │  npm run build + zip → S3 → CodeDeploy
    ▼             ▼
  Laravel       Angular
  en EC2        en EC2
```

El job de backend espera a que el agente CodeDeploy esté activo en la instancia recién creada antes de lanzar el despliegue. En el lado de Laravel, el script `after_install.sh` ejecuta las migraciones, genera la `APP_KEY` y cachea la configuración automáticamente.

---

## Puesta en marcha local

### Requisitos previos

- Node.js 20+ y npm 11+
- PHP 8.3+ y Composer
- MySQL 8+

### Frontend Angular

```bash
cd Angular-frontend
npm install
npm start          # http://localhost:4200
```

El proxy de desarrollo redirige `/api/*` a `https://ivan123.alwaysdata.net` para evitar problemas de CORS.

### API Laravel

```bash
cd techuniverse-api

composer install

cp .env.example .env
# Configurar DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD
# Para usar almacenamiento local en lugar de R2: FILESYSTEM_DISK=public

php artisan key:generate
php artisan migrate --seed
php artisan serve  # http://localhost:8000
```

Para generar la documentación Swagger:

```bash
php artisan l5-swagger:generate
# Disponible en http://localhost:8000/api/documentation
```

---

## Estrategia de ramas

```
main ──────────────────────────────────────────► producción estable
         ▲                        ▲
         │  merge cuando está listo│
develop ─┼────────────────────────┴──────────► integración y pruebas
         │
         feature/xxx ────────────────────────► desarrollo de funcionalidades
```

| Rama | Propósito |
|---|---|
| `main` | Código estable listo para producción. El pipeline despliega desde aquí. |
| `develop` | Rama de integración. Las funcionalidades se fusionan aquí antes de pasar a `main`. |

---

## Diseño y documentación

| Recurso | Enlace |
|---|---|
| Prototipo UI (Figma) | [Diseño de pantallas y componentes](https://www.figma.com/design/CdztUWth7lbVUKpVMSYNvb/Proyecto-Intermodular?node-id=0-1&p=f&t=3Ktj0fuLzQOQryqP-0) |
| Modelo Entidad-Relación (Draw.io) | [Diagrama E/R de la base de datos](https://app.diagrams.net/#G1vMNrhgW8aM7IMlQlUvtK2p8JPdPG2GnY#%7B%22pageId%22%3A%22xxhzdqV2dHcMtNHvoPZn%22%7D) |
| Documentación API (Swagger) | [OpenAPI 3.0 interactivo](https://ivan123.alwaysdata.net/api/documentation/) |
| Tablero de tareas (Trello) | [Planificación y seguimiento](https://trello.com/invite/b/697b4853d8ecbe0e5996204b/ATTIc810d1fd18a816186cc78a2e81e4ce46EBBE5D9A/tfg) |
| Demostración en vídeo | [Vídeo de presentación](https://drive.google.com/file/d/1ALMScHhkEyg9Yz9KpZ_TAwLdgAdaIH_u/view?usp=sharing) |
| Repositorio original API | [Ivanrr462/API-TechUniverse](https://github.com/Ivanrr462/API-TechUniverse) |

# TechUniverse API

Backend REST API para un e-commerce tecnológico (TechUniverse), desarrollado con **Laravel 11.x** como parte del Trabajo de Fin de Grado en Desarrollo de Aplicaciones Web.

<div align="center">
  <img src="https://img.shields.io/badge/PHP-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white">
  <img src="https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white">
  <img src="https://img.shields.io/badge/MySQL-%234479A1.svg?style=for-the-badge&logo=mysql&logoColor=white">
  <img src="https://img.shields.io/badge/OpenAPI-Swagger-%2385EA2D.svg?style=for-the-badge&logo=swagger&logoColor=black">
  <br />
  
![CI](https://github.com/Ivanrr462/API-Ecommerce/actions/workflows/ci.yml/badge.svg)
</div>

---

## 📋 Descripción

API REST completa que proporciona funcionalidades de e-commerce incluyendo:
- ✅ Gestión de productos y categorías
- ✅ Autenticación con Sanctum
- ✅ Carrito de compra y lista de deseos
- ✅ Sistema de especificaciones de productos
- ✅ Control de acceso basado en roles

---

## 🛠️ Stack Tecnológico

- **Framework**: Laravel 11.x
- **Lenguaje**: PHP 8.x
- **Base de datos**: MySQL
- **Autenticación**: Sanctum
- **Documentación API**: L5-Swagger (OpenAPI 3.0)
- **Testing**: PHPUnit

---

## 📦 Requisitos Previos

- PHP >= 8.2
- Composer
- MySQL
- Node.js (para Vite/Assets)

---

## 🚀 Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/Ivanrr462/API-Ecommerce.git
   cd API-Ecommerce
   ```

2. **Instalar dependencias**
   ```bash
   composer install
   npm install
   ```

3. **Configurar variables de entorno**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Configurar base de datos** en `.env`
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=techstore
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Ejecutar migraciones y seeders**
   ```bash
   php artisan migrate --seed
   ```

6. **Generar documentación Swagger**
   ```bash
   php artisan l5-swagger:generate
   ```

## ▶️ Ejecución

```bash
# Desarrollo
php artisan serve

# Con Vite (assets en tiempo real)
npm run dev
```

La API estará disponible en `http://localhost:8000`

---

## 📌 Control de Versiones

Este proyecto sigue un esquema de versionado semántico adaptado al desarrollo del TFG.  
Cada versión refleja nuevas funcionalidades, mejoras internas y cambios en la arquitectura del backend.

---

### 🟩 Versión **1.0.0** — Publicación Inicial

Primera versión estable de la API TechUniverse, que incluye:

#### 🔧 Core del Backend
- CRUD completo para:
  - Productos  
  - Categorías  
  - Especificaciones técnicas  
  - Usuarios
- Relaciones entre entidades totalmente implementadas.
- Validación robusta en endpoints.
- Respuestas JSON estandarizadas.

#### 🔐 Autenticación y Seguridad
- Autenticación basada en tokens con **Laravel Sanctum**.
- Middleware de protección para rutas sensibles.

#### 🛒 Funcionalidades de E‑commerce
- Carrito de compra (Cesta)
- Wishlist (Lista de deseos)
- Gestión de stock y disponibilidad

#### 🧱 Panel de Administración
- Panel admin construido con **FilamentPHP**:
  - Gestión visual de productos, categorías, especificaciones y usuarios
  - Acceso restringido a administradores
  - Formularios y tablas dinámicas

#### 📘 Documentación API
- Documentación completa con **Swagger (OpenAPI 3.0)** usando L5‑Swagger.
- Endpoints documentados con ejemplos de request/response.
- Generación automática del archivo `api-docs.json`.

---

### 🟦 Versión **1.1.0** — Próximas Mejoras (En Desarrollo)

Esta sección está preparada para futuras actualizaciones.

#### 🔄 Mejoras Planificadas (Roadmap 1.1)
- 🔜 **Count en listados**
  - Devolver el número total de productos en respuestas paginadas.
  - Útil para interfaces que muestran resultados dinámicos.

- 🔜 **Ordenación por precio**
  - `?sort=price_asc`
  - `?sort=price_desc`

- 🔜 **Ordenación por novedad**
  - Ordenar por fecha de creación o actualización.
  - Ideal para mostrar “lo último añadido”.

- 🔜 **Búsqueda de productos**
  - Búsqueda por nombre, categoría o especificaciones.
  - Preparado para futura búsqueda avanzada (1.2+).
---

## 🏗️ Estructura del Proyecto

```
app/
├── Http/
│   ├── Controllers/
│   │   └── Api/
│   │       ├── ProductoController.php
│   │       ├── CategoriaController.php
│   │       ├── UserController.php
│   │       ├── WishlistController.php
│   │       ├── CestaController.php
│   │       └── ...
│   ├── Resources/
│   └── Middleware/
├── Models/
│   ├── Producto.php
│   ├── Categoria.php
│   ├── User.php
│   └── ...
└── Providers/

database/
├── migrations/
├── seeders/
└── factories/

routes/
├── api.php
└── web.php

config/
└── l5-swagger.php (Configuración Swagger)
```

## 🔐 Autenticación

La API usa **Laravel Sanctum** para autenticación token-based. Los tokens se usan en el header:
```
Authorization: Bearer {token}
```

Roles disponibles:
- `admin` — Acceso total a operaciones CRUD
- `usuario` — Acceso a carrito, wishlist y perfil

## 🧪 Testing

```bash
php artisan test
```

## 📝 Créditos

Desarrollado por [Iván Ríos](https://github.com/Ivanrr462) como Backend del TFG para DAW.

## 📄 Licencia

Este proyecto es de código abierto bajo la licencia MIT.

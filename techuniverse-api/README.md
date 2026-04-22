# TechUniverse API

Backend REST API para un e-commerce tecnológico (TechUniverse), desarrollado con **Laravel 11.x** como parte del Trabajo de Fin de Grado en Desarrollo de Aplicaciones Web.

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

## Repo original

Para ver el repo original irse a [Repo](https://github.com/Ivanrr462/API-TechUniverse)


API REST creada en Laravel 12.X como backend de un e-commerce tecnológico (TechUniverse), creado como parte del TFG de Desarrollo de Aplicaciones Web. La API proporciona endpoints completos para operaciones CRUD, implementación de autenticación Sanctum, etc (por desarrollar).

<div align="center">
  <img src="https://img.shields.io/badge/Php-%23777BB4.svg?style=for-the-badge&logo=php&logoColor=white">
  <img src="https://img.shields.io/badge/Laravel-%23FF2D20.svg?style=for-the-badge&logo=laravel&logoColor=white">
  <br />
  
![CI](https://github.com/Ivanrr462/API-Ecommerce/actions/workflows/ci.yml/badge.svg)

</div>

## Endpoints

### 🔐 Autenticación

**Públicos**
- `POST /api/register` — Registrar usuario
- `POST /api/login` — Iniciar sesión

**Autenticado**
- `POST /api/logout` — Cerrar sesión

### 🛒 Productos

**Públicos**
- `GET /api/productos` — Listar productos
- `GET /api/productos/{id}` — Ver un producto

**Admin** (`auth:sanctum` + `rol:admin`)
- `POST /api/productos` — Crear producto
- `PUT /api/productos/{id}` — Actualizar producto
- `DELETE /api/productos/{id}` — Eliminar producto

### 🗂️ Categorías

**Públicos**
- `GET /api/categoria` — Listar categorías
- `GET /api/categoria/{id}` — Ver una categoría
- `GET /api/categoria/productos` — Listar categorías con productos

**Admin** (`auth:sanctum` + `rol:admin`)
- `POST /api/categoria` — Crear categoría
- `PUT /api/categoria/{id}` — Actualizar categoría
- `DELETE /api/categoria/{id}` — Eliminar categoría

### 👤 Usuarios

**Admin** (`auth:sanctum` + `rol:admin`)
- `GET /api/usuarios` — Listar usuarios
- `GET /api/usuarios/{id}` — Ver usuario
- `POST /api/usuarios` — Crear usuario
- `PUT /api/usuarios/{id}` — Actualizar usuario
- `DELETE /api/usuarios/{id}` — Eliminar usuario

### ❤️ Wishlist

**Usuario** (`auth:sanctum` + `rol:usuario`)
- `GET /api/deseos` — Listar deseos del usuario
- `GET /api/deseos/{id}` — Ver ítem de la lista
- `POST /api/deseos` — Añadir producto a deseos
- `DELETE /api/deseos/{id}` — Eliminar producto de deseos

### 🛒 Cesta (carrito)

**Usuario** (`auth:sanctum` + `rol:usuario`)

**Cesta**
- `GET /api/cesta` — Ver la cesta del usuario

**Productos en cesta**
- `POST /api/cesta/productos` — Añadir producto a la cesta
- `PUT /api/cesta/productos/{id}` — Actualizar cantidad
- `DELETE /api/cesta/productos/{id}` — Eliminar producto de la cesta

### 🧾 Especificaciones

**Públicos**
- `GET /api/especificacion` — Listar especificaciones
- `GET /api/especificacion/{id}` — Ver especificación con productos
- `GET /api/especificacion/productos` — Listar especificaciones con productos

**Admin** (`auth:sanctum` + `rol:admin`)
- `POST /api/especificacion` — Crear especificación
- `PUT /api/especificacion/{id}` — Actualizar especificación
- `DELETE /api/especificacion/{id}` — Eliminar especificación

### 🧩 Producto-Especificación

**Admin** (`auth:sanctum` + `rol:admin`)
- `POST /api/especificacion/productos` — Añadir especificación a un producto
- `PUT /api/especificacion/productos/{id}` — Actualizar valor de la especificación en el producto
- `DELETE /api/especificacion/productos/{id}` — Eliminar especificación del producto

## 📝 Créditos

Desarrollado por [Iván Ríos](https://github.com/Ivanrr462) como Backend del TFG para DAW

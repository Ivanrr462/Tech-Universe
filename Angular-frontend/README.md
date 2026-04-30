# Frontend Angular — TechUniverse

E-commerce de tecnología desarrollado en **Angular 21** con componentes standalone, Angular Material, Tailwind CSS y comunicación con la [API REST de TechUniverse](https://ivan123.alwaysdata.net/api/documentation/).

---

## Índice

- [Tecnologías](#tecnologías)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Páginas y rutas](#páginas-y-rutas)
- [Componentes](#componentes)
- [Servicios](#servicios)
- [Modelos](#modelos)
- [Puesta en marcha](#puesta-en-marcha)
- [Proxy API](#proxy-api)

---

## Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 21 | Framework principal |
| Angular Material | 21 | Componentes UI |
| Tailwind CSS | 3 | Estilos utilitarios |
| TypeScript | 5.9 | Lenguaje |
| RxJS | 7.8 | Programación reactiva |
| Lucide Angular | latest | Iconografía |

---

## Estructura del proyecto

```
src/app/
├── pages/            # Vistas principales (lazy-loaded)
│   ├── home/
│   ├── category/
│   ├── product-detail/
│   ├── cart/
│   ├── checkout/
│   ├── auth/
│   ├── search/
│   ├── wishlist/
│   └── not-found/
├── components/       # Componentes reutilizables
│   ├── navbar/
│   ├── product-card/
│   ├── pagination/
│   ├── theme-toggle/
│   └── toast/
├── services/         # Lógica de negocio e integración API
├── models/           # Interfaces TypeScript
└── interceptors/     # Interceptor JWT
```

---

## Páginas y rutas

| Ruta | Página | Descripción |
|---|---|---|
| `/` | Home | Portada con productos destacados |
| `/category/:category` | Category | Listado de productos por categoría con paginación |
| `/product/:id` | ProductDetail | Detalle de producto con especificaciones |
| `/cart` | Cart | Carrito de compra |
| `/checkout` | Checkout | Formulario de finalización de compra |
| `/auth` | Auth | Login y registro |
| `/search` | Search | Resultados de búsqueda |
| `/wishlist` | Wishlist | Lista de deseos del usuario |
| `**` | NotFound | Página 404 |

Todas las rutas usan **lazy loading** mediante `loadComponent()`.

---

## Componentes

| Componente | Descripción |
|---|---|
| `navbar` | Barra de navegación con buscador, acceso a carrito, wishlist y sesión |
| `product-card` | Tarjeta de producto reutilizable con botón de añadir a favoritos |
| `pagination` | Paginación genérica para listados |
| `theme-toggle` | Alternador de tema claro/oscuro |
| `toast` | Notificaciones emergentes de éxito y error |

---

## Servicios

| Servicio | Responsabilidad |
|---|---|
| `AuthService` | Login, registro, logout y persistencia de sesión con JWT |
| `ProductService` | Consulta de productos, categorías y búsqueda |
| `CartService` | Gestión del carrito (añadir, eliminar, vaciar) |
| `WishlistService` | Lista de deseos sincronizada con la API (`/api/deseos`) |
| `ThemeService` | Persistencia y aplicación del tema claro/oscuro |
| `ToastService` | Emisión de notificaciones globales |

El interceptor `auth.interceptor.ts` adjunta automáticamente el token JWT en todas las peticiones a la API.

---

## Modelos

| Modelo | Campos principales |
|---|---|
| `Product` | `id`, `nombre`, `precio`, `foto`, `categoria`, `especificaciones` |
| `User` | `id`, `name`, `email` |
| `CartItem` | `productId`, `name`, `price`, `image`, `quantity` |
| `WishlistItem` | `productId`, `name`, `price`, `image`, `category` |

---

## Puesta en marcha

**Requisitos:** Node.js 20+ y npm 11+

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo (con proxy a la API)
npm start
```

La aplicación estará disponible en `http://localhost:4200`.

```bash
# Build de producción
npm run build

# Ejecutar tests
npm test
```

---

## Proxy API

En desarrollo, las peticiones a `/api/*` se redirigen automáticamente a la API desplegada para evitar problemas de CORS:

```json
{
  "/api": {
    "target": "https://ivan123.alwaysdata.net",
    "secure": true,
    "changeOrigin": true
  }
}
```

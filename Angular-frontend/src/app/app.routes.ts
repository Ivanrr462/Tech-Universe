import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
    title: 'TechUniverse - Tu tienda de electrónica online'
  },
  {
    path: 'category/:category',
    loadComponent: () => import('./pages/category/category').then(m => m.Category),
    title: 'Categoría - TechUniverse'
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail/product-detail').then(m => m.ProductDetail),
    title: 'Producto - TechUniverse'
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart').then(m => m.Cart),
    title: 'Carrito de Compras - TechUniverse'
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout').then(m => m.Checkout),
    title: 'Finalizar Compra - TechUniverse'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/auth').then(m => m.Auth),
    title: 'Iniciar Sesión - TechUniverse'
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then(m => m.Search),
    title: 'Búsqueda - TechUniverse'
  },
  {
    path: 'wishlist',
    loadComponent: () => import('./pages/wishlist/wishlist').then(m => m.Wishlist),
    title: 'Lista de Deseos - TechUniverse'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
    title: '404 - Página no encontrada'
  }
];

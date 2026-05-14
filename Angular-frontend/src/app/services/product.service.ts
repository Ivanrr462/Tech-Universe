import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '@models/product.model';

export interface PaginatedProducts {
  products: Product[];
  currentPage: number;
  lastPage: number;
  total: number;
}

export interface Categoria {
  id: number;
  nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/productos';

  private mapApiToProduct(apiProduct: any): Product {
    const specs: Record<string, string> = {};
    if (Array.isArray(apiProduct.especificaciones)) {
      apiProduct.especificaciones.forEach((spec: any) => {
        if (spec?.nombre) specs[spec.nombre] = spec.valor ?? '';
      });
    }

    const discountRaw = apiProduct.descuento ?? apiProduct.discount;
    const discount = discountRaw ? Math.round(discountRaw) : undefined;
    const hasDiscount = !!apiProduct.precioDescuento;

    return {
      id: (apiProduct.id ?? apiProduct.producto_id)?.toString() ?? '',
      name: apiProduct.nombre ?? '',
      price: hasDiscount ? apiProduct.precioDescuento : (apiProduct.precio ?? 0),
      originalPrice: hasDiscount ? apiProduct.precio : undefined,
      image: apiProduct.foto ?? '',
      category: apiProduct.categoria?.nombre ?? 'General',
      description: apiProduct.descripcion ?? '',
      specs,
      stock: apiProduct.stock ?? 0,
      isNew: apiProduct.isNew || undefined,
      discount,
    };
  }

  private mapPaginatedResponse(response: any): PaginatedProducts {
    const meta = response.meta || response;
    return {
      products: (response.data || []).map((p: any) => this.mapApiToProduct(p)),
      currentPage: meta.current_page || 1,
      lastPage: meta.last_page || 1,
      total: meta.total || 0,
    };
  }

  // Todos los productos paginados — para /category/todos
  getProducts(page = 1): Observable<PaginatedProducts> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(response => this.mapPaginatedResponse(response))
    );
  }

  // Lista de categorías con sus IDs
  getCategorias(): Observable<Categoria[]> {
    return this.http.get<any>('/api/categoria').pipe(
      map(response => Array.isArray(response) ? response : (response.data || []))
    );
  }

  // Productos de una categoría específica paginados — para /category/:slug
  getProductsByCategory(categoryId: number): Observable<Product[]> {
    return this.http.get<any>(`/api/categoria/${categoryId}`).pipe(
      map(response => (response.data?.productos || []).map((p: any) => this.mapApiToProduct(p)))
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(response => {
        const p = response.data ? response.data : response;
        return p ? this.mapApiToProduct(p) : undefined;
      })
    );
  }

  getNewProducts(limit = 5): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}?sort=novedad_asc`).pipe(
      map(response => (response.data || []).map((p: any) => this.mapApiToProduct(p)).slice(0, limit))
    );
  }

  getOfferProducts(): Observable<Product[]> {
    return this.http.get<any>(`${this.apiUrl}/oferta`).pipe(
      map(response => (response.data || []).map((p: any) => this.mapApiToProduct(p)))
    );
  }
}

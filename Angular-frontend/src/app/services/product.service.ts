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

    return {
      id: (apiProduct.id ?? apiProduct.producto_id)?.toString() ?? '',
      name: apiProduct.nombre ?? '',
      price: apiProduct.precio ?? 0,
      image: apiProduct.foto ?? '',
      category: apiProduct.categoria?.nombre ?? 'General',
      description: apiProduct.descripcion ?? '',
      specs,
      stock: apiProduct.stock ?? 0,
      isNew: apiProduct.isNew || undefined,
      discount: apiProduct.discount || undefined,
    };
  }

  private mapPaginatedResponse(response: any): PaginatedProducts {
    return {
      products: (response.data || []).map((p: any) => this.mapApiToProduct(p)),
      currentPage: response.current_page || 1,
      lastPage: response.last_page || 1,
      total: response.total || 0,
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

  getFeaturedProducts(): Observable<Product[]> {
    return this.getProducts(1).pipe(map(r => r.products.filter(p => p.isNew)));
  }

  getDiscountProducts(): Observable<Product[]> {
    return this.getProducts(1).pipe(map(r => r.products.filter(p => p.discount)));
  }
}

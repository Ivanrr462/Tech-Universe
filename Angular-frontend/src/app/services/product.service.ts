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

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = '/api/productos';

  private mapApiToProduct(apiProduct: any): Product {
    const specs: Record<string, string> = {};
    if (apiProduct.especificaciones && Array.isArray(apiProduct.especificaciones)) {
      apiProduct.especificaciones.forEach((spec: any) => {
        specs[spec.nombre] = spec.valor;
      });
    }

    return {
      id: apiProduct.id.toString(),
      name: apiProduct.nombre,
      price: apiProduct.precio,
      image: apiProduct.foto,
      category: apiProduct.categoria?.nombre || 'General',
      description: apiProduct.descripcion,
      specs,
      stock: apiProduct.stock,
      isNew: apiProduct.isNew || undefined,
      discount: apiProduct.discount || undefined,
    };
  }

  getProducts(page = 1): Observable<PaginatedProducts> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}`).pipe(
      map(response => ({
        products: (response.data || []).map((p: any) => this.mapApiToProduct(p)),
        currentPage: response.current_page || 1,
        lastPage: response.last_page || 1,
        total: response.total || 0,
      }))
    );
  }

  getAllByCategories(): Observable<Record<string, Product[]>> {
    return this.http.get<any>('/api/categorias/productos').pipe(
      map(response => {
        const categories = Array.isArray(response) ? response : (response.data || []);
        const result: Record<string, Product[]> = {};
        categories.forEach((cat: any) => {
          const products = (cat.productos || []).map((p: any) => this.mapApiToProduct(p));
          result[cat.nombre] = products;
        });
        return result;
      })
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

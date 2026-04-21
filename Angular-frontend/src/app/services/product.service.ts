import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Product } from '@models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = 'https://ivan123.alwaysdata.net/api/productos';

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
      specs: specs,
      stock: apiProduct.stock,
      isNew: apiProduct.isNew || undefined,
      discount: apiProduct.discount || undefined
    };
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(apiProducts => apiProducts.map(p => this.mapApiToProduct(p)))
    );
  }

  getProductById(id: string): Observable<Product | undefined> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(p => p ? this.mapApiToProduct(p) : undefined)
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products =>
        products.filter(p => p.category.toLowerCase() === category.toLowerCase())
      )
    );
  }

  searchProducts(query: string): Observable<Product[]> {
    const lowerQuery = query.toLowerCase();
    return this.getAllProducts().pipe(
      map(products =>
        products.filter(
          p =>
            p.name.toLowerCase().includes(lowerQuery) ||
            p.description.toLowerCase().includes(lowerQuery) ||
            p.category.toLowerCase().includes(lowerQuery)
        )
      )
    );
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(p => p.isNew))
    );
  }

  getDiscountProducts(): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map(products => products.filter(p => p.discount))
    );
  }
}

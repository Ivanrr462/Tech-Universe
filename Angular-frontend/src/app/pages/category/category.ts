import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { Pagination } from '@components/pagination/pagination';
import { LucideAngularModule, ArrowLeft, PackageX } from 'lucide-angular';
import { switchMap, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '@models/product.model';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, Pagination, LucideAngularModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class Category {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly PackageXIcon = PackageX;

  private pageSubject = new BehaviorSubject(1);

  categoryName = toSignal(
    this.route.paramMap.pipe(
      map(params => {
        const slug = params.get('category') || '';
        if (slug === 'todos') return 'Todos los Productos';
        if (slug === 'ofertas') return 'Ofertas Especiales';
        return slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      })
    ),
    { initialValue: '' }
  );

  paginatedData = toSignal(
    this.route.paramMap.pipe(
      map(p => p.get('category') || ''),
      distinctUntilChanged(),
      tap(() => this.pageSubject.next(1)),
      switchMap(slug => {
        if (slug === 'todos') {
          // Paginación server-side via /api/productos
          return this.pageSubject.pipe(
            switchMap(page =>
              this.productService.getProducts(page).pipe(
                map(r => ({ products: r.products, currentPage: r.currentPage, lastPage: r.lastPage }))
              )
            )
          );
        }

        // Categorías específicas y ofertas — client-side con getAllByCategories
        return this.productService.getAllByCategories().pipe(
          map(catMap => {
            let products: Product[];
            if (slug === 'ofertas') {
              products = Object.values(catMap).flat().filter(p => p.discount);
            } else {
              const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              products = catMap[name] || [];
            }
            return { products, currentPage: 1, lastPage: 1 };
          })
        );
      })
    ),
    { initialValue: { products: [] as Product[], currentPage: 1, lastPage: 1 } }
  );

  onPageChange(page: number): void {
    this.pageSubject.next(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

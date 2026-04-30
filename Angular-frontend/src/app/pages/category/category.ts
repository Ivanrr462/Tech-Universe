import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { Pagination } from '@components/pagination/pagination';
import { LucideAngularModule, ArrowLeft, PackageX } from 'lucide-angular';
import { switchMap, map, tap, distinctUntilChanged } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
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
          return this.pageSubject.pipe(
            switchMap(page =>
              this.productService.getProducts(page).pipe(
                map(r => ({ products: r.products, currentPage: r.currentPage, lastPage: r.lastPage, paginated: true }))
              )
            )
          );
        }

        if (slug === 'ofertas') {
          return this.productService.getProducts(1).pipe(
            map(r => ({ products: r.products.filter(p => p.discount), currentPage: 1, lastPage: 1, paginated: false }))
          );
        }

        const name = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return this.productService.getCategorias().pipe(
          switchMap(cats => {
            const cat = cats.find(c => c.nombre.localeCompare(name, 'es', { sensitivity: 'base' }) === 0);
            if (!cat) return of({ products: [] as Product[], currentPage: 1, lastPage: 1, paginated: false });
            return this.productService.getProductsByCategory(cat.id).pipe(
              map(products => ({ products, currentPage: 1, lastPage: 1, paginated: false }))
            );
          })
        );
      })
    ),
    { initialValue: { products: [] as Product[], currentPage: 1, lastPage: 1, paginated: false } }
  );

  onPageChange(page: number): void {
    this.pageSubject.next(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

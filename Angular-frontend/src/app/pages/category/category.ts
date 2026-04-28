import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { Pagination } from '@components/pagination/pagination';
import { LucideAngularModule, ArrowLeft, PackageX } from 'lucide-angular';
import { switchMap, map, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Subject, combineLatest } from 'rxjs';
import { Product } from '@models/product.model';

const PAGE_SIZE = 12;

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

  currentPage = signal(1);
  lastPage = signal(1);

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

  // Resolves what to fetch based on category slug
  private categoryData = toSignal(
    this.route.paramMap.pipe(
      tap(() => this.currentPage.set(1)),
      switchMap(params => {
        const slug = params.get('category') || '';
        if (slug === 'todos') {
          return this.productService.getAllByCategories().pipe(
            map(catMap => {
              const all = Object.values(catMap).flat();
              return { allProducts: all, isTodos: true };
            })
          );
        }
        return this.productService.getAllByCategories().pipe(
          map(catMap => {
            let filtered: Product[];
            if (slug === 'ofertas') {
              filtered = Object.values(catMap).flat().filter(p => p.discount);
            } else {
              const categoryName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
              filtered = catMap[categoryName] || [];
            }
            return { allProducts: filtered, isTodos: false };
          })
        );
      })
    ),
    { initialValue: { allProducts: [] as Product[], isTodos: false } }
  );

  pagedProducts = computed(() => {
    const data = this.categoryData();
    const page = this.currentPage();
    const all = data.allProducts;
    const total = all.length;
    const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    this.lastPage.set(pages);
    const start = (page - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  });

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductCard } from '@components/product-card/product-card';
import { Pagination } from '@components/pagination/pagination';
import { LucideAngularModule, ArrowLeft, SearchX } from 'lucide-angular';
import { switchMap, map, tap } from 'rxjs/operators';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '@models/product.model';

const PAGE_SIZE = 12;

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCard, Pagination, LucideAngularModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);

  readonly ArrowLeftIcon = ArrowLeft;
  readonly SearchXIcon = SearchX;

  currentPage = signal(1);

  searchQuery = toSignal(
    this.route.queryParamMap.pipe(map(p => p.get('q') || '')),
    { initialValue: '' }
  );

  private allResults = toSignal(
    this.route.queryParamMap.pipe(
      tap(() => this.currentPage.set(1)),
      switchMap(params => {
        const query = (params.get('q') || '').toLowerCase();
        return this.productService.getProducts(1).pipe(
          map(r => r.products.filter((p: Product) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.category.toLowerCase().includes(query)
          ))
        );
      })
    ),
    { initialValue: [] as Product[] }
  );

  lastPage = computed(() =>
    Math.max(1, Math.ceil(this.allResults().length / PAGE_SIZE))
  );

  pagedResults = computed(() => {
    const all = this.allResults();
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return all.slice(start, start + PAGE_SIZE);
  });

  totalResults = computed(() => this.allResults().length);

  onPageChange(page: number): void {
    this.currentPage.set(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

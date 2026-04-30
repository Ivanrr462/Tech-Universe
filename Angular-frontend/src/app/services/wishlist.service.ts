import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { WishlistItem } from '@models/wishlist-item.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  private itemsSignal = signal<WishlistItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadWishlist(user.id);
      } else {
        this.itemsSignal.set([]);
      }
    });
  }

  isInWishlist(productId: string): boolean {
    return this.itemsSignal().some(item => item.productId === productId);
  }

  loadWishlist(userId: number): void {
    this.http.get<any>(`/api/deseos/${userId}`).subscribe({
      next: (response) => {
        const data: any[] = response.desea ?? [];
        this.itemsSignal.set(
          data.map((entry: any) => ({
            productId: entry.id?.toString(),
            name: entry.nombre,
            price: entry.precio,
            image: entry.foto,
            category: entry.categoria?.nombre || 'General',
          }))
        );
      },
      error: () => {}
    });
  }

  addToWishlist(productId: string, name: string, price: number, image: string, category: string): void {
    const userId = this.authService.currentUserValue?.id;
    this.http.post<any>('/api/deseos', { producto_id: Number(productId), user_id: userId }).subscribe({
      next: () => {
        this.itemsSignal.update(items => [...items, { productId, name, price, image, category }]);
        this.toastService.success('Añadido a favoritos');
      },
      error: () => this.toastService.error('Error al añadir a favoritos')
    });
  }

  removeFromWishlist(productId: string): void {
    const userId = this.authService.currentUserValue?.id;
    this.http.delete<any>(`/api/deseos/${productId}`, { body: { user_id: userId } }).subscribe({
      next: () => {
        this.itemsSignal.update(items => items.filter(i => i.productId !== productId));
        this.toastService.success('Eliminado de favoritos');
      },
      error: () => this.toastService.error('Error al eliminar de favoritos')
    });
  }
}

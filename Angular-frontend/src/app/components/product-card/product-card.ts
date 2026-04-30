import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, ShoppingCart, Heart } from 'lucide-angular';
import { CartService } from '@services/cart.service';
import { WishlistService } from '@services/wishlist.service';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  @Input({ required: true }) id!: string;
  @Input({ required: true }) name!: string;
  @Input({ required: true }) price!: number;
  @Input() originalPrice?: number;
  @Input({ required: true }) image!: string;
  @Input({ required: true }) category!: string;
  @Input() isNew?: boolean;
  @Input() discount?: number;

  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  readonly ShoppingCartIcon = ShoppingCart;
  readonly HeartIcon = Heart;

  get inWishlist(): boolean {
    return this.wishlistService.isInWishlist(this.id);
  }

  handleAddToCart(event: Event): void {
    event.preventDefault();
    if (!this.authService.getToken()) {
      this.toastService.info('Inicia sesión para añadir al carrito');
      this.router.navigate(['/auth']);
      return;
    }
    this.cartService.addItem(this.id, this.name, this.price, this.image);
  }

  toggleWishlist(event: Event): void {
    event.preventDefault();
    if (!this.authService.getToken()) {
      this.toastService.info('Inicia sesión para guardar en favoritos');
      this.router.navigate(['/auth']);
      return;
    }
    if (this.inWishlist) {
      this.wishlistService.removeFromWishlist(this.id);
    } else {
      this.wishlistService.addToWishlist(this.id, this.name, this.price, this.image, this.category);
    }
  }
}

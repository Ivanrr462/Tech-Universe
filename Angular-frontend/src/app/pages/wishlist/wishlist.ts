import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';
import { CartService } from '@services/cart.service';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { LucideAngularModule, Heart, Trash2, ShoppingCart, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule],
  templateUrl: './wishlist.html',
})
export class Wishlist {
  wishlistService = inject(WishlistService);
  private cartService = inject(CartService);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  readonly HeartIcon = Heart;
  readonly TrashIcon = Trash2;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly ArrowLeftIcon = ArrowLeft;

  addToCart(productId: string, name: string, price: number, image: string): void {
    if (!this.authService.getToken()) {
      this.toastService.info('Inicia sesión para añadir al carrito');
      return;
    }
    this.cartService.addItem(productId, name, price, image);
  }

  removeFromWishlist(productId: string): void {
    this.wishlistService.removeFromWishlist(productId);
  }
}

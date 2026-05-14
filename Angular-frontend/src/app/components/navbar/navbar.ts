import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ShoppingCart, User, LogOut, Heart } from 'lucide-angular';
import { ThemeService } from '@services/theme.service';
import { CartService } from '@services/cart.service';
import { AuthService } from '@services/auth.service';
import { WishlistService } from '@services/wishlist.service';
import { CATEGORIES } from '@models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule,
    LucideAngularModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private router = inject(Router);
  cartService = inject(CartService);
  authService = inject(AuthService);
  themeService = inject(ThemeService);
  wishlistService = inject(WishlistService);

  readonly SearchIcon = Search;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly UserIcon = User;
  readonly LogOutIcon = LogOut;
  readonly HeartIcon = Heart;

  searchQuery = '';
  categories = CATEGORIES;

  handleSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { q: this.searchQuery }
      });
    }
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }
}

import { Component, inject, CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, ShoppingCart, User, Menu, ChevronDown, LogOut } from 'lucide-angular';
import { ThemeToggle } from '../theme-toggle/theme-toggle';
import { ThemeService } from '@services/theme.service';
import { CartService } from '@services/cart.service';
import { AuthService } from '@services/auth.service';
import { CATEGORIES } from '@models/product.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    LucideAngularModule,
    ThemeToggle
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

  // Icon references
  readonly SearchIcon = Search;
  readonly ShoppingCartIcon = ShoppingCart;
  readonly UserIcon = User;
  readonly MenuIcon = Menu;
  readonly ChevronDownIcon = ChevronDown;
  readonly LogOutIcon = LogOut;

  searchQuery = '';
  categories = CATEGORIES;
  showCategoryDropdown = false;

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

  navigateToCategory(category: string): void {
    const slug = category.toLowerCase().replace(/\s+/g, '-');
    this.router.navigate(['/category', slug]);
    this.showCategoryDropdown = false;
  }

  toggleCategoryDropdown(): void {
    this.showCategoryDropdown = !this.showCategoryDropdown;
  }

  closeCategoryDropdown(): void {
    setTimeout(() => {
      this.showCategoryDropdown = false;
    }, 200);
  }

  onThemeChange(event: any): void {
    const newTheme = event.detail.theme;
    if (this.themeService.theme() !== newTheme) {
      this.themeService.toggleTheme();
    }
  }
}

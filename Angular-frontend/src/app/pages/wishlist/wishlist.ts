import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishlistService } from '@services/wishlist.service';
import { LucideAngularModule, Heart, ArrowLeft } from 'lucide-angular';
import { ProductCard } from '@components/product-card/product-card';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideAngularModule, ProductCard],
  templateUrl: './wishlist.html',
})
export class Wishlist {
  wishlistService = inject(WishlistService);

  readonly HeartIcon = Heart;
  readonly ArrowLeftIcon = ArrowLeft;
}

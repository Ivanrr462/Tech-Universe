import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '@services/cart.service';
import { AuthService } from '@services/auth.service';
import { LucideAngularModule, Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-angular';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule, RouterLink, LucideAngularModule],
    templateUrl: './cart.html',
    styleUrl: './cart.css'
})
export class Cart {
    cartService = inject(CartService);
    private authService = inject(AuthService);
    private router = inject(Router);

    // Icon references
    readonly TrashIcon = Trash2;
    readonly MinusIcon = Minus;
    readonly PlusIcon = Plus;
    readonly ArrowRightIcon = ArrowRight;
    readonly ShoppingBagIcon = ShoppingBag;

    shippingCost = computed(() => {
        const subtotal = this.cartService.subtotal();
        return subtotal > 50 ? 0 : 5.99;
    });

    tax = computed(() => {
        return this.cartService.subtotal() * 0.21;
    });

    total = computed(() => {
        return this.cartService.subtotal() + this.tax() + this.shippingCost();
    });

    proceedToCheckout(): void {
        if (this.authService.getToken()) {
            this.router.navigate(['/checkout']);
        } else {
            this.router.navigate(['/auth']);
        }
    }
}

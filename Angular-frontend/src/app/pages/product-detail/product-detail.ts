import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { ProductService } from '@services/product.service';
import { CartService } from '@services/cart.service';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { Product } from '@models/product.model';
import { Observable, switchMap } from 'rxjs';
import { LucideAngularModule, ShoppingCart, Truck, Shield, AlertCircle, ArrowLeft } from 'lucide-angular';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink, LucideAngularModule],
    templateUrl: './product-detail.html',
    styleUrl: './product-detail.css'
})
export class ProductDetail {
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private productService = inject(ProductService);
    private cartService = inject(CartService);
    private authService = inject(AuthService);
    private toastService = inject(ToastService);

    product$: Observable<Product | undefined> = this.route.paramMap.pipe(
        switchMap(params => this.productService.getProductById(params.get('id') || ''))
    );

    // Icon references
    readonly ShoppingCartIcon = ShoppingCart;
    readonly TruckIcon = Truck;
    readonly ShieldIcon = Shield;
    readonly AlertIcon = AlertCircle;
    readonly ArrowLeftIcon = ArrowLeft;

    addToCart(product: Product): void {
        if (!this.authService.getToken()) {
            this.toastService.info('Inicia sesión para añadir al carrito');
            this.router.navigate(['/auth']);
            return;
        }
        if (product.stock > 0) {
            this.cartService.addItem(product.id, product.name, product.price, product.image);
        }
    }

    isLowStock(stock: number): boolean {
        return stock < 10;
    }
}

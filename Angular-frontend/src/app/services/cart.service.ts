import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth.service';
import { ToastService } from '@services/toast.service';
import { CartItem } from '@models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);

  private itemsSignal = signal<CartItem[]>([]);
  readonly items = this.itemsSignal.asReadonly();

  readonly totalItems = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  constructor() {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.loadCart();
      } else {
        this.itemsSignal.set([]);
      }
    });
  }

  loadCart(): void {
    this.http.get<any>('/api/cesta').subscribe({
      next: (response) => {
        const cestaProductos = response.data?.productos || [];
        this.itemsSignal.set(
          cestaProductos.map((cp: any) => {
            const discount = cp.descuento ? Math.round(parseFloat(cp.descuento)) : undefined;
            const hasDiscount = !!discount && discount > 0;
            return {
              cestaProductoId: cp.id,
              productId: cp.producto_id?.toString() ?? cp.id?.toString(),
              name: cp.nombre ?? '',
              price: hasDiscount && cp.precioDescuento ? parseFloat(cp.precioDescuento) : parseFloat(cp.precio_unitario) || 0,
              originalPrice: hasDiscount ? parseFloat(cp.precio_unitario) : undefined,
              image: cp.foto ?? cp.imagen ?? '',
              quantity: cp.cantidad,
              discount,
            };
          })
        );
      },
      error: () => {}
    });
  }

  addItem(productId: string, name: string, price: number, image: string): void {
    const existing = this.itemsSignal().find(i => i.productId === productId);
    if (existing) {
      this.updateQuantity(existing.cestaProductoId, existing.quantity + 1);
      return;
    }

    this.http.post<any>('/api/cesta/productos', { producto_id: Number(productId), cantidad: 1 }).subscribe({
      next: () => {
        this.loadCart();
        this.toastService.success('Producto añadido al carrito');
      },
      error: () => this.toastService.error('Error al añadir al carrito')
    });
  }

  updateQuantity(cestaProductoId: number, newQuantity: number): void {
    if (newQuantity < 1) return;
    this.http.put<any>(`/api/cesta/productos/${cestaProductoId}`, { cantidad: newQuantity }).subscribe({
      next: () => {
        this.itemsSignal.update(items =>
          items.map(item =>
            item.cestaProductoId === cestaProductoId
              ? { ...item, quantity: newQuantity }
              : item
          )
        );
      },
      error: () => this.toastService.error('Error al actualizar la cantidad')
    });
  }

  removeItem(cestaProductoId: number): void {
    this.http.delete<any>(`/api/cesta/productos/${cestaProductoId}`).subscribe({
      next: () => {
        this.itemsSignal.update(items =>
          items.filter(item => item.cestaProductoId !== cestaProductoId)
        );
      },
      error: () => this.toastService.error('Error al eliminar el producto')
    });
  }

  clearCart(): void {
    this.itemsSignal.set([]);
  }
}

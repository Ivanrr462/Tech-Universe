import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

const buildCartResponse = (productos: any[]) => ({ data: { productos } });

const makeProduct = (id: number, productoId: number, nombre: string, precio: string, cantidad: number) => ({
  id,
  producto_id: productoId,
  nombre,
  precio_unitario: precio,
  cantidad,
  foto: '',
});

describe('CartService', () => {
  let service: CartService;
  let httpMock: HttpTestingController;
  let userSubject: BehaviorSubject<any>;

  beforeEach(() => {
    userSubject = new BehaviorSubject<any>(null);

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ToastService,
        {
          provide: AuthService,
          useValue: {
            currentUser$: userSubject.asObservable(),
            currentUserValue: null,
          },
        },
      ],
    });

    service = TestBed.inject(CartService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty cart', () => {
    expect(service.items()).toEqual([]);
    expect(service.totalItems()).toBe(0);
    expect(service.subtotal()).toBe(0);
  });

  it('should load cart items when user logs in', () => {
    userSubject.next({ id: 1 });
    const req = httpMock.expectOne('/api/cesta');
    req.flush(buildCartResponse([
      makeProduct(1, 10, 'Laptop', '999.99', 1),
    ]));

    expect(service.items().length).toBe(1);
    expect(service.items()[0].name).toBe('Laptop');
    expect(service.items()[0].price).toBe(999.99);
    expect(service.items()[0].productId).toBe('10');
  });

  it('should compute totalItems correctly', () => {
    userSubject.next({ id: 1 });
    httpMock.expectOne('/api/cesta').flush(buildCartResponse([
      makeProduct(1, 10, 'A', '10.00', 3),
      makeProduct(2, 11, 'B', '20.00', 2),
    ]));
    expect(service.totalItems()).toBe(5);
  });

  it('should compute subtotal correctly', () => {
    userSubject.next({ id: 1 });
    httpMock.expectOne('/api/cesta').flush(buildCartResponse([
      makeProduct(1, 10, 'A', '10.00', 3),
      makeProduct(2, 11, 'B', '20.00', 2),
    ]));
    expect(service.subtotal()).toBe(70);
  });

  it('should clear the cart', () => {
    userSubject.next({ id: 1 });
    httpMock.expectOne('/api/cesta').flush(buildCartResponse([
      makeProduct(1, 10, 'Laptop', '999.99', 1),
    ]));
    expect(service.items().length).toBe(1);

    service.clearCart();
    expect(service.items()).toEqual([]);
  });

  it('should not send HTTP request when updateQuantity receives 0', () => {
    service.updateQuantity(1, 0);
    httpMock.expectNone('/api/cesta/productos/1');
  });

  it('should send PUT on updateQuantity with valid quantity', () => {
    service.updateQuantity(5, 3);
    const req = httpMock.expectOne('/api/cesta/productos/5');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual({ cantidad: 3 });
    req.flush({});
  });

  it('should send DELETE on removeItem', () => {
    service.removeItem(7);
    const req = httpMock.expectOne('/api/cesta/productos/7');
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});

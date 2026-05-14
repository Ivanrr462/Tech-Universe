import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { BehaviorSubject } from 'rxjs';
import { WishlistService } from './wishlist.service';
import { AuthService } from './auth.service';
import { ToastService } from './toast.service';

describe('WishlistService', () => {
  let service: WishlistService;
  let httpMock: HttpTestingController;
  let userSubject: BehaviorSubject<any>;
  let mockAuthService: any;

  beforeEach(() => {
    userSubject = new BehaviorSubject<any>(null);
    mockAuthService = {
      currentUser$: userSubject.asObservable(),
      currentUserValue: null,
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ToastService,
        { provide: AuthService, useValue: mockAuthService },
      ],
    });

    service = TestBed.inject(WishlistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty wishlist', () => {
    expect(service.items()).toEqual([]);
  });

  it('should return false for isInWishlist when list is empty', () => {
    expect(service.isInWishlist('123')).toBe(false);
  });

  it('should load wishlist items when user logs in', () => {
    userSubject.next({ id: 5 });
    httpMock.expectOne('/api/deseos/5').flush({
      data: {
        desea: [
          { id: 1, nombre: 'Laptop', precio: 999, foto: 'laptop.jpg', categoria: { nombre: 'Portátiles' } },
        ],
      },
    });

    expect(service.items().length).toBe(1);
    expect(service.items()[0].name).toBe('Laptop');
    expect(service.items()[0].category).toBe('Portátiles');
    expect(service.isInWishlist('1')).toBe(true);
  });

  it('should add item to wishlist', () => {
    userSubject.next({ id: 5 });
    httpMock.expectOne('/api/deseos/5').flush({ data: { desea: [] } });

    mockAuthService.currentUserValue = { id: 5 };
    service.addToWishlist('42', 'Tablet', 299, 'tablet.jpg', 'Tablets');

    const req = httpMock.expectOne('/api/deseos');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ producto_id: 42, user_id: 5 });
    req.flush({});

    expect(service.isInWishlist('42')).toBe(true);
  });

  it('should remove item from wishlist', () => {
    userSubject.next({ id: 5 });
    httpMock.expectOne('/api/deseos/5').flush({
      data: {
        desea: [{ id: 42, nombre: 'Tablet', precio: 299, foto: '', categoria: null }],
      },
    });
    expect(service.isInWishlist('42')).toBe(true);

    mockAuthService.currentUserValue = { id: 5 };
    service.removeFromWishlist('42');

    const req = httpMock.expectOne('/api/deseos/42');
    expect(req.request.method).toBe('DELETE');
    req.flush({});

    expect(service.isInWishlist('42')).toBe(false);
  });
});

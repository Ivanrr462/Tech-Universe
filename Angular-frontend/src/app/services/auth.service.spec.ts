import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return null token when not logged in', () => {
    expect(service.getToken()).toBeNull();
  });

  it('should have null currentUserValue initially', () => {
    expect(service.currentUserValue).toBeNull();
  });

  it('should read an existing token from localStorage', () => {
    localStorage.setItem('auth_token', 'mi-token-123');
    expect(service.getToken()).toBe('mi-token-123');
  });

  it('should store token and user on successful login', () => {
    const credentials = { email: 'test@techuniverse.com', password: '123456' };
    const mockResponse = {
      access_token: 'jwt-abc',
      user: { id: 1, name: 'Test User', email: 'test@techuniverse.com' },
    };

    service.login(credentials).subscribe();

    const req = httpMock.expectOne('/api/login');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);
    req.flush(mockResponse);

    expect(service.getToken()).toBe('jwt-abc');
    expect(service.currentUserValue).toEqual(mockResponse.user);
  });

  it('should clear token and user on logout', () => {
    localStorage.setItem('auth_token', 'some-token');

    service.logout();

    const req = httpMock.expectOne('/api/logout');
    expect(req.request.method).toBe('POST');
    req.flush({});

    expect(service.getToken()).toBeNull();
    expect(service.currentUserValue).toBeNull();
  });
});

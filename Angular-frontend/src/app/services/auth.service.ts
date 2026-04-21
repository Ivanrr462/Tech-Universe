import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '@models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = '/api'; // Use proxy target

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.checkToken();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  private removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  private checkToken() {
    const token = this.getToken();
    if (token) {
      // Optcional: recuperar el perfil de usuario actual con GET /api/user 
      // Por ahora, asumimos que si hay token, intentará resolverlo luego o restauramos de localeStorage
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        this.currentUserSubject.next(JSON.parse(savedUser));
      }
    }
  }

  login(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        if (response && response.access_token) {
          this.setToken(response.access_token);
          this.currentUserSubject.next(response.user);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
        }
      })
    );
  }

  register(userData: any): Observable<any> {
    // La API solo confirma creación y no entrega token. Retornamos tal cual para luego redirigir.
    return this.http.post<any>(`${this.apiUrl}/register`, userData);
  }

  logout(): void {
    // Si la API soporta logout, lo llamamos. Aunque falle por backend, limpiamos el frontend.
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe({
      next: () => this.clearSession(),
      error: () => this.clearSession()
    });
  }

  private clearSession(): void {
    this.removeToken();
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}

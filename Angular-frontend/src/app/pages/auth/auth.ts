import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { LucideAngularModule, User, Mail, Lock, ArrowRight } from 'lucide-angular';
import { ToastService } from '@services/toast.service';
import { AuthService } from '@services/auth.service';

type AuthMode = 'login' | 'register';

@Component({
    selector: 'app-auth',
    standalone: true,
    imports: [CommonModule, RouterLink, ReactiveFormsModule, LucideAngularModule],
    templateUrl: './auth.html',
    styleUrl: './auth.css'
})
export class Auth {
    private fb = inject(FormBuilder);
    private router = inject(Router);
    private toastService = inject(ToastService);
    private authService = inject(AuthService);

    // Icon references
    readonly UserIcon = User;
    readonly MailIcon = Mail;
    readonly LockIcon = Lock;
    readonly ArrowRightIcon = ArrowRight;

    mode = signal<AuthMode>('login');

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]]
    });

    registerForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]]
    });

    switchMode(newMode: AuthMode): void {
        this.mode.set(newMode);
        this.loginForm.reset();
        this.registerForm.reset();
    }

    onLogin(): void {
        if (this.loginForm.valid) {
            this.authService.login(this.loginForm.value).subscribe({
                next: () => {
                    this.toastService.success('¡Bienvenido de nuevo!');
                    this.router.navigate(['/']);
                },
                error: (err) => {
                    this.toastService.error('Credenciales incorrectas o error en el servidor');
                    console.error(err);
                }
            });
        } else {
            this.loginForm.markAllAsTouched();
            this.toastService.error('Por favor, completa todos los campos correctamente');
        }
    }

    onRegister(): void {
        if (this.registerForm.valid) {
            const { name, email, password, confirmPassword } = this.registerForm.value;

            if (password !== confirmPassword) {
                this.toastService.error('Las contraseñas no coinciden');
                return;
            }

            this.authService.register({ name, email, password }).subscribe({
                next: () => {
                    this.toastService.success('¡Registro exitoso! Por favor inicia sesión.');
                    this.switchMode('login');
                },
                error: (err) => {
                    this.toastService.error('Error al registrar. Revisa que el email no exista y los datos sean válidos.');
                    console.error(err);
                }
            });
        } else {
            this.registerForm.markAllAsTouched();
            this.toastService.error('Por favor, completa todos los campos correctamente');
        }
    }
}

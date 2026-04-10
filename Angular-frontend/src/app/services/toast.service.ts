import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  message: string;
  title?: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<ToastMessage[]>([]);
  toasts = this.toastsSignal.asReadonly();

  success(message: string, title?: string): void {
    this.addToast(message, 'success', title);
  }

  error(message: string, title?: string): void {
    this.addToast(message, 'error', title);
  }

  info(message: string, title?: string): void {
    this.addToast(message, 'info', title);
  }

  warning(message: string, title?: string): void {
    this.addToast(message, 'warning', title);
  }

  private addToast(message: string, type: ToastType, title?: string) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, message, title, type };
    this.toastsSignal.update(toasts => [...toasts, newToast]);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: string) {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}


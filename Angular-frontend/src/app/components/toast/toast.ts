import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '@services/toast.service';
import { LucideAngularModule, CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-angular';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './toast.html',
  animations: [
    trigger('toastAnimations', [
      transition(':enter', [
        style({ transform: 'translateY(100%)', opacity: 0 }),
        animate('300ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'translateY(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('250ms cubic-bezier(0.4, 0, 0.2, 1)', style({ transform: 'scale(0.9)', opacity: 0 }))
      ])
    ])
  ]
})
export class Toast {
  toastService = inject(ToastService);

  readonly CheckCircleIcon = CheckCircle;
  readonly AlertIcon = AlertCircle;
  readonly InfoIcon = Info;
  readonly WarningIcon = AlertTriangle;
  readonly CloseIcon = X;

  getIcon(type: string) {
    switch(type) {
      case 'success': return this.CheckCircleIcon;
      case 'error': return this.AlertIcon;
      case 'warning': return this.WarningIcon;
      default: return this.InfoIcon;
    }
  }

  getIconColorClass(type: string) {
    switch(type) {
      case 'success': return 'text-green-500 dark:text-green-400';
      case 'error': return 'text-red-500 dark:text-red-400';
      case 'warning': return 'text-yellow-500 dark:text-yellow-400';
      default: return 'text-blue-500 dark:text-blue-400';
    }
  }

  getBgColorClass(type: string) {
    switch(type) {
      case 'success': return 'bg-green-100 dark:bg-green-900/30';
      case 'error': return 'bg-red-100 dark:bg-red-900/30';
      case 'warning': return 'bg-yellow-100 dark:bg-yellow-900/30';
      default: return 'bg-blue-100 dark:bg-blue-900/30';
    }
  }
}

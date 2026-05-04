import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no toasts', () => {
    expect(service.toasts()).toEqual([]);
  });

  it('should add a success toast', () => {
    service.success('Operación completada');
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].type).toBe('success');
    expect(service.toasts()[0].message).toBe('Operación completada');
  });

  it('should add an error toast', () => {
    service.error('Algo salió mal');
    expect(service.toasts()[0].type).toBe('error');
    expect(service.toasts()[0].message).toBe('Algo salió mal');
  });

  it('should add an info toast', () => {
    service.info('Información disponible');
    expect(service.toasts()[0].type).toBe('info');
  });

  it('should add a warning toast', () => {
    service.warning('Ten cuidado');
    expect(service.toasts()[0].type).toBe('warning');
  });

  it('should include the title when provided', () => {
    service.success('Listo', 'Éxito');
    expect(service.toasts()[0].title).toBe('Éxito');
  });

  it('should remove a toast by id', () => {
    service.success('Primero');
    service.error('Segundo');
    const idToRemove = service.toasts()[0].id;
    service.remove(idToRemove);
    expect(service.toasts().length).toBe(1);
    expect(service.toasts()[0].message).toBe('Segundo');
  });

  it('should support multiple toasts at once', () => {
    service.success('Uno');
    service.error('Dos');
    service.info('Tres');
    expect(service.toasts().length).toBe(3);
  });

  it('should auto-remove toast after 3 seconds', () => {
    vi.useFakeTimers();
    service.success('Temporal');
    expect(service.toasts().length).toBe(1);
    vi.advanceTimersByTime(3000);
    expect(service.toasts().length).toBe(0);
    vi.useRealTimers();
  });
});

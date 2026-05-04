import { TestBed } from '@angular/core/testing';
import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let service: ThemeService;

  beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: (query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }),
    });
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set theme to light', () => {
    service.setTheme('light');
    expect(service.theme()).toBe('light');
  });

  it('should set theme to dark', () => {
    service.setTheme('dark');
    expect(service.theme()).toBe('dark');
  });

  it('should toggle from light to dark', () => {
    service.setTheme('light');
    service.toggleTheme();
    expect(service.theme()).toBe('dark');
  });

  it('should toggle from dark to light', () => {
    service.setTheme('dark');
    service.toggleTheme();
    expect(service.theme()).toBe('light');
  });
});

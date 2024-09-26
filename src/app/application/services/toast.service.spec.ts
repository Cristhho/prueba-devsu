import { TestBed } from '@angular/core/testing';

import { ToastService } from './toast.service';
import { ToastModel } from '@app/domain';

const toast: ToastModel = {message: '', type: 'success'};

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('debe crearse la instancia', () => {
    expect(service).toBeTruthy();
  });

  it('debe iniciar con 0 elementos', () => {
    const toasts = service.toasts;
    expect(toasts.length).toBe(0);
  });

  it('debe agregar 1 toast de tipo success y aumentar la longitud a 1', () => {
    service.add(toast);
    expect(service.toasts.length).toBe(1);
    const primerToast = service.toasts.at(0);
    expect(primerToast).toBeDefined();
    expect(primerToast!.type).toBe('success');
  });

  it('debe eliminar 1 toast de la lista y tener 0 elementos', () => {
    service.add(toast);
    service.remove(0);
    expect(service.toasts.length).toBe(0);
  })
});

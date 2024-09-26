import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEliminarComponent } from './modal-eliminar.component';
import { ProductoService } from '@app/application/services/producto.service';
import { findByQuery } from '../../../../test';
import { ModalService } from '@app/application/services/modal.service';

describe('ModalEliminarComponent', () => {
  let component: ModalEliminarComponent;
  let fixture: ComponentFixture<ModalEliminarComponent>;
  const id = "123";
  const nombre = "producto";

  beforeEach(() => {
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['eliminar', 'obtener']);
    const modalSpy = jasmine.createSpyObj("ModalService", ["close"]);
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy },
        { provide: ModalService, useValue: modalSpy }
      ]
    });
    fixture = TestBed.createComponent(ModalEliminarComponent);
    component = fixture.componentInstance;
    component.id = id;
    component.nombre = nombre;
    fixture.detectChanges();
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
    expect(component.id).toBe(id);
    expect(component.nombre).toBe(nombre);
  });

  it('debe llamar a cerrar el modal', () => {
    const spy = spyOn(fixture.componentInstance, 'onClose');
    const debug = findByQuery(fixture, 'button')
    debug.triggerEventHandler('click', null)
    expect(spy).toHaveBeenCalled()
  });
});

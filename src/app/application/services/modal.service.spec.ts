import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalService } from './modal.service';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  template: `<span>Modal content</span>`,
  imports: [],
})
class TestComponent {}

@Component({
  standalone: true,
  template: `<div></div>`,
  imports: [],
})
class RootTestComponent {}

describe('ModalService', () => {
  let service: ModalService;
  let fixture: ComponentFixture<RootTestComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RootTestComponent);
    service = TestBed.inject(ModalService);
  });

  it('debe crear la instancia', () => {
    expect(service).toBeTruthy();
  });

  /* it('debe montar el contenido en el modal', () => {
    service.open(TestComponent);

    const modal = fixture.componentInstance;
    const debug = findByQuery(fixture, 'span');
    const contenido = getElementTextByDebug(debug);

    expect(modal).toBeDefined();
    expect(contenido).toBe('Modal content');
  }) */
});

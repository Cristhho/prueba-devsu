import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContextMenuComponent } from './context-menu.component';
import { ContextMenuModel } from '@app/domain';
import { findAllByQuery, getElementTextByDebug } from '../../../../test';
import { By } from '@angular/platform-browser';

const items: Array<ContextMenuModel> = [
  { menuEvent: 'envento 1', menuText: 'Item 1'}
];

describe('ContextMenuComponent', () => {
  let component: ContextMenuComponent;
  let fixture: ComponentFixture<ContextMenuComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContextMenuComponent);
    component = fixture.componentInstance;
    component.contextMenuItems = items;
    fixture.detectChanges();
  });

  it('debe crear la instancia', () => {
    expect(component).toBeTruthy();
  });

  it('debe tener un arreglo de items', () => {
    const cantidadItems = items.length;
    expect(component.contextMenuItems.length).toBe(cantidadItems);
  })

  it('debe renderizar los items del menu', () => {
    const debug = findAllByQuery(fixture, '.menu-link');
    const primerItem = getElementTextByDebug(
      debug.at(0)!.query(By.css('span'))
    );

    expect(debug.length).toEqual(items.length)
    expect(primerItem).toEqual(items.at(0)!.menuText)
  })
});

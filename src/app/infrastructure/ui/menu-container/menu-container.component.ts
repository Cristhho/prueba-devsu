import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ContextMenuModel, ID, MenuEventType } from '@app/domain';
import { ContextMenuComponent } from "../context-menu/context-menu.component";

@Component({
  selector: 'app-menu-container',
  standalone: true,
  imports: [
    CommonModule,
    ContextMenuComponent
],
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.css']
})
export class MenuContainerComponent {
  @Input()
  id: ID = '';

  mostrarMenu: boolean;
  menuItems: Array<ContextMenuModel> = [];
  posicionX: number;
  posicionY: number;

  constructor(
    private readonly router: Router,
  ) {
    this.mostrarMenu = false;
    this.menuItems = [
      {
        menuText: 'Modificar',
        menuEvent: 'Handle refactor',
      },
      {
        menuText: 'Eliminar',
        menuEvent: 'Handle format',
      },
    ];
    this.posicionX = 0;
    this.posicionY = 0;
  }

  mostrarMenuContextual(event: any) {
    this.mostrarMenu = true;
    this.posicionX = event.clientX;
    this.posicionY = event.clientY;
  }

  menuStyle() {
    return {
      position: 'fixed',
      zIndex: 9,
      left: `${this.posicionX}px`,
      top: `${this.posicionY}px`
    }
  }

  handleMenuItemClick(event: MenuEventType) {
    this.mostrarMenu = false;
    switch (event.data) {
      case this.menuItems[0].menuEvent:
        this.router.navigate(['/', this.id]);
        break;
      case this.menuItems[1].menuEvent:
          console.log('To handle formatting');
    }
  }

  overlayClick() {
    this.mostrarMenu = false;
  }
}

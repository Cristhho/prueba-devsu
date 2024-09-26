import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ContextMenuModel, MenuEventType } from '@app/domain';

@Component({
  selector: 'app-context-menu',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css']
})
export class ContextMenuComponent {
  @Input()
  contextMenuItems!: Array<ContextMenuModel>;

  @Output()
  onContextMenuItemClick: EventEmitter<MenuEventType> = new EventEmitter<MenuEventType>();

  onContextMenuClick(event: MouseEvent, data: string) {
    this.onContextMenuItemClick.emit({
      event,
      data,
    });
  }
}

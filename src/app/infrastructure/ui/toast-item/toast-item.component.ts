import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { ToastService } from '@app/application/services/toast.service';
import { TipoToast } from '@app/domain';

@Component({
  selector: 'app-toast-item',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './toast-item.component.html',
  styleUrls: ['./toast-item.component.css']
})
export class ToastItemComponent {
  @Input()
  mensaje!: string;

  @Input()
  tipo!: TipoToast;

  @Input()
  toastkey!: number;

  constructor(private readonly toastService: ToastService) {}

  remover() {
    this.toastService.remove(this.toastkey);
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-boton',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './boton.component.html',
  styleUrl: './boton.component.css',
})
export class BotonComponent {
  @Input()
  label: string = '';

  @Input()
  tipo: string = 'submit';

  @Input()
  class: string = '';

  @Output()
  btnClick = new EventEmitter<void>();

  onClick() {
    this.btnClick.emit();
  }
}


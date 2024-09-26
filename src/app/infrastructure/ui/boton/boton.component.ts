import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

type Variante = "primario" | "secundario";

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

  @Input()
  variante: Variante = 'primario';

  @Input()
  disabled: boolean = false;

  @Output()
  btnClick = new EventEmitter<void>();

  onClick() {
    if (!this.disabled)
      this.btnClick.emit();
  }
}


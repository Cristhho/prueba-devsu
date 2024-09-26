import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputTextComponent } from '../input-text/input-text.component';
import { FormularioService } from '@app/application/services/formulario.service';
import { ProductoService } from '@app/application/services/producto.service';
import { FechasUtils } from '@app/utils/fechas';
import { Producto } from '@app/domain';

@Component({
  selector: 'app-form-producto',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent
  ],
  templateUrl: './form-producto.component.html',
  styleUrl: './form-producto.component.css',
})
export class FormProductoComponent implements OnDestroy, OnInit {
  suscripciones: Array<Subscription> = [];
  revision: WritableSignal<string> = signal('');

  @Input({ required: false })
  editando = false;

  get formulario() {
    return this.formularioService.formulario;
  }

  constructor(
    private readonly formularioService: FormularioService,
    private readonly productoService: ProductoService
  ) {
    this.suscripciones.push(
      this.formularioService.formulario.get('fechaLiberacion')!.valueChanges.subscribe((value) => {
        if (Boolean(value)) {
          const fecha = new Date(Date.parse(value));
          const tiempo = new Date(fecha.getTime() + 31556952000);
          this.revision.set(FechasUtils.formatoInput(tiempo));
        } else {
          this.revision.set('');
        }
      })
    );
  }

  ngOnInit(): void {
    if (this.editando)
      this.formulario.get('id')?.disable();
    else
      this.formulario.get('id')?.enable();
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((s) => s.unsubscribe);
  }
}


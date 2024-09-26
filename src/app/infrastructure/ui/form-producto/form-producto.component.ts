import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputTextComponent } from '../input-text/input-text.component';
import { FormularioService } from '@app/application/services/formulario.service';
import { ProductoService } from '@app/application/services/producto.service';
import { FechasUtils } from '@app/utils/fechas';

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
      this.formularioService.formulario.get('fechaLiberacion')!.valueChanges.subscribe((valor) => {
        if (Boolean(valor)) this.calcularRevision(valor);
        else
          this.revision.set('');
      })
    );
  }

  private calcularRevision(valor: string) {
    const fecha = new Date(Date.parse(valor));
    const tiempo = new Date(fecha.getTime() + 31556952000);
    this.revision.set(FechasUtils.formatoInput(tiempo));
  }

  ngOnInit(): void {
    if (this.editando) {
      this.formulario.get('id')?.disable();
      this.calcularRevision(this.formulario.get('fechaLiberacion')!.value);
    }
    else
      this.formulario.get('id')?.enable();
  }

  ngOnDestroy(): void {
    this.suscripciones.forEach((s) => s.unsubscribe);
  }
}


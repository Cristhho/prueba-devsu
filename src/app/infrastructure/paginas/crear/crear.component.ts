import { CommonModule } from '@angular/common';
import { Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

import { InputTextComponent } from "../../ui/input-text/input-text.component";
import { BotonComponent } from "../../ui/boton/boton.component";
import { FechasUtils } from '@app/utils/fechas';
import { FormularioService } from '@app/application/services/formulario.service';
import { ProductoService } from '@app/application/services/producto.service';
import { BotonAtrasComponent } from "../../ui/boton-atras/boton-atras.component";

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextComponent,
    BotonComponent,
    BotonAtrasComponent
],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent implements OnDestroy {
  revision: WritableSignal<string> = signal('');
  suscripciones: Array<Subscription> = [];

  get formulario() {
    return this.formularioService.formulario;
  }
  get cargando$() {
    return this.productoService.cargando$;
  }

  constructor(
    private readonly formularioService: FormularioService,
    private readonly productoService: ProductoService
  ) {
    this.formularioService.construirFormulario();
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

  ngOnDestroy(): void {
    this.suscripciones.forEach(s => s.unsubscribe());
  }

  public reiniciarFormulario() {
    this.formulario.reset();
  }

  public guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.suscripciones.push(
      this.productoService.guardar(this.formularioService.crearModelo(this.revision())).subscribe({
        complete: () => {
          this.reiniciarFormulario();
        },
      })
    );
  }
}


import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { BotonComponent } from "../boton/boton.component";
import { FormularioService } from '@app/application/services/formulario.service';
import { ProductoService } from '@app/application/services/producto.service';

@Component({
  selector: 'app-form-botones',
  standalone: true,
  imports: [
    CommonModule,
    BotonComponent
],
  templateUrl: './form-botones.component.html',
  styleUrl: './form-botones.component.css',
})
export class FormBotonesComponent implements OnDestroy {
  suscripciones: Array<Subscription> = [];
  @Input()
  revision = '';

  @Input({ required: false })
  editando = false;

  @Input({ required: false })
  id = '';

  get cargando$() {
    return this.productoService.cargando$;
  }

  get formulario() {
    return this.formularioService.formulario;
  }

  constructor(
    private readonly formularioService: FormularioService,
    private readonly productoService: ProductoService
  ) {}

  ngOnDestroy(): void {
    this.suscripciones.forEach((s) => s.unsubscribe);
  }

  public reiniciarFormulario() {
    this.formulario.reset();
  }

  public guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    if (this.editando) {

    }
    this.suscripciones.push(
      this.productoService.guardar(this.formularioService.crearModelo(this.revision)).subscribe({
        complete: () => {
          this.reiniciarFormulario();
        },
      })
    );
  }

  public actualizar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    const {id, ...modelo} = this.formularioService.crearModelo(this.revision)
    this.suscripciones.push(
      this.productoService.modificar(this.id, modelo).subscribe()
    );
  }
}


import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { BotonComponent } from "../boton/boton.component";
import { FormularioService } from '@app/application/services/formulario.service';
import { ActualizarProductoUseCase, GuardarProductoUseCase } from '@app/application/useCases';

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
export class FormBotonesComponent {
  @Input()
  revision = '';

  @Input({ required: false })
  editando = false;

  @Input({ required: false })
  id = '';

  get cargando() {
    return this.editando ? this.actualizarUseCase.cargando() : this.guardarUseCase.cargando();
  }

  get formulario() {
    return this.formularioService.formulario;
  }

  constructor(
    private readonly formularioService: FormularioService,
    private readonly guardarUseCase: GuardarProductoUseCase,
    private readonly actualizarUseCase: ActualizarProductoUseCase,
  ) {}

  public reiniciarFormulario() {
    this.formulario.reset();
  }

  public guardar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.guardarUseCase.execute({
      producto: this.formularioService.crearModelo(this.revision),
      onSuccess: () => this.reiniciarFormulario()
    });
  }

  public actualizar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }
    this.actualizarUseCase.execute(this.formularioService.crearModelo(this.revision));
  }
}


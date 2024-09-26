import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { FormularioService } from '@app/application/services/formulario.service';
import { BotonAtrasComponent } from "../../ui/boton-atras/boton-atras.component";
import { FormProductoComponent } from "../../ui/form-producto/form-producto.component";
import { FormBotonesComponent } from "../../ui/form-botones/form-botones.component";

@Component({
  selector: 'app-crear',
  standalone: true,
  imports: [
    CommonModule,
    BotonAtrasComponent,
    FormProductoComponent,
    FormBotonesComponent
],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.css',
})
export class CrearComponent {
  suscripciones: Array<Subscription> = [];

  @ViewChild(FormProductoComponent)
  private formRef!: FormProductoComponent;

  get revision() {
    return this.formRef ? this.formRef.revision() : '';
  }

  constructor(
    private readonly formularioService: FormularioService
  ) {
    this.formularioService.construirFormulario();
  }
}


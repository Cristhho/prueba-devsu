import { CommonModule } from '@angular/common';
import { AfterContentChecked, ChangeDetectorRef, Component, effect, inject, Input, signal, ViewChild } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { BotonAtrasComponent } from "../../ui/boton-atras/boton-atras.component";
import { FormProductoComponent } from "../../ui/form-producto/form-producto.component";
import { FormBotonesComponent } from "../../ui/form-botones/form-botones.component";
import { FormularioService } from '@app/application/services/formulario.service';
import { FechasUtils } from '@app/utils/fechas';
import { ProductoPorIdUseCase } from '@app/application/useCases';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [
    CommonModule,
    BotonAtrasComponent,
    FormProductoComponent,
    FormBotonesComponent
],
  templateUrl: './editar.component.html',
  styleUrl: './editar.component.css',
})
export class EditarComponent implements AfterContentChecked {
  @ViewChild(FormProductoComponent)
  private formRef!: FormProductoComponent;

  @Input({required: true})
  set id(idProducto: string) {
    this.idProducto.set(idProducto);
  }

  public idProducto = signal('');

  private readonly obtenerProducto = inject(ProductoPorIdUseCase);
  public productoQuery = injectQuery(this.obtenerProducto.execute({ id: this.idProducto }));

  get revision() {
    return this.formRef ? this.formRef.revision() : '';
  }
  get datos() {
    return this.productoQuery.data;
  }

  constructor(
    private readonly changeDetector: ChangeDetectorRef,
    private readonly formularioService: FormularioService,
  ) {
    this.formularioService.construirFormulario(true);
    effect(() => {
      const producto = this.datos();
      if (producto)
        this.formularioService.formulario.patchValue({
          descripcion: producto.descripcion,
          fechaLiberacion: FechasUtils.formatoInput(producto.fechaLiberacion),
          id: producto.id as string,
          logo: producto.logo,
          nombre: producto.nombre
        });
    });
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }
}


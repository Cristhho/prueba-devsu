import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';

import { MenuContainerComponent } from "../menu-container/menu-container.component";
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ObtenerProductosUseCase } from '@app/application/useCases';

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MenuContainerComponent,
    ProgressBarComponent
],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.css'
})
export class TablaProductosComponent {
  busqueda = input.required<string>();

  private readonly obtenerProductos = inject(ObtenerProductosUseCase);
  public productos = injectQuery(this.obtenerProductos.execute({ busqueda: this.busqueda }));

  get cargando() {
    return this.productos.isFetching;
  }

  get datos() {
    return this.productos.data;
  }
}


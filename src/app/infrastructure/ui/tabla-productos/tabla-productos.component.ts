import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';

import { ProductoService } from '@app/application/services/producto.service';
import { Producto } from '@app/domain';
import { MenuContainerComponent } from "../menu-container/menu-container.component";

@Component({
  selector: 'app-tabla-productos',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MenuContainerComponent
],
  templateUrl: './tabla-productos.component.html',
  styleUrl: './tabla-productos.component.css'
})
export class TablaProductosComponent implements OnChanges {
  @Input({ required: true })
  busqueda = '';

  public productos$: Observable<Producto[]>;
  public productosFiltrados$: Observable<Producto[]> = this.servicio.buscar('');

  constructor(private readonly servicio: ProductoService){
    this.productos$ = this.servicio.obtener();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productosFiltrados$ = this.servicio.buscar(changes['busqueda'].currentValue);
  }
}


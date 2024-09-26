import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
export class TablaProductosComponent implements OnInit, OnChanges {
  @Input({ required: true })
  busqueda = '';

  public productos$!: Observable<Producto[]>;
  public productosFiltrados$!: Observable<Producto[]>;

  constructor(private readonly servicio: ProductoService){
  }

  ngOnInit(): void {
    this.productos$ = this.servicio.obtener();
    this.productosFiltrados$ = this.servicio.buscar('');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.productosFiltrados$ = this.servicio.buscar(changes['busqueda'].currentValue);
  }
}


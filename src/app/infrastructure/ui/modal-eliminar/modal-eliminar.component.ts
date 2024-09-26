import { Component, Input } from '@angular/core';

import { ModalService } from '@app/application/services/modal.service';
import { BotonComponent } from '../boton/boton.component';
import { ID } from '@app/domain';
import { ProductoService } from '@app/application/services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-eliminar',
  standalone: true,
  imports: [
    CommonModule,
    BotonComponent
  ],
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent {
  @Input()
  id: ID = '';

  @Input()
  nombre: string = '';

  get cargando$() {
    return this.productoService.cargando$;
  }

  constructor(
    private readonly modalService: ModalService,
    private readonly productoService: ProductoService
  ) { }

  public onClose() {
    this.modalService.close();
  }

  public eliminar() {
    if (this.id) {
      this.productoService.eliminar(this.id).subscribe({
        complete: () => {
          this.productoService.obtener().subscribe();
          this.onClose();
        }
      });
    }
  }
}

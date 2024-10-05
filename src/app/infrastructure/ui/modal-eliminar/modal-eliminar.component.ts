import { Component, Input } from '@angular/core';

import { ModalService } from '@app/application/services/modal.service';
import { BotonComponent } from '../boton/boton.component';
import { ID } from '@app/domain';
import { CommonModule } from '@angular/common';
import { EliminarProductoUseCase } from '@app/application/useCases';

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

  constructor(
    private readonly modalService: ModalService,
    public readonly eliminarUseCase: EliminarProductoUseCase
  ) { }

  public onClose() {
    this.modalService.close();
  }

  public eliminar() {
    if (this.id) {
      this.eliminarUseCase.execute({
        id: this.id,
        onSuccess: () => this.onClose()
      });
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BotonAtrasComponent } from "../../ui/boton-atras/boton-atras.component";
import { FormProductoComponent } from "../../ui/form-producto/form-producto.component";
import { FormBotonesComponent } from "../../ui/form-botones/form-botones.component";
import { FormularioService } from '@app/application/services/formulario.service';
import { ProductoService } from '@app/application/services/producto.service';
import { Observable, tap } from 'rxjs';
import { Producto } from '@app/domain';
import { FechasUtils } from '@app/utils/fechas';

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
export class EditarComponent implements OnInit {
  @ViewChild(FormProductoComponent)
  private formRef!: FormProductoComponent;

  public producto$!: Observable<Producto>;

  public id = '';

  get revision() {
    return this.formRef ? this.formRef.revision() : '';
  }

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly formularioService: FormularioService,
    private readonly productoService: ProductoService
  ) {
    this.formularioService.construirFormulario(true);
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id: string | null = params.get('id');
      if (id) {
        this.id = id;
        this.producto$ = this.productoService.buscarPorId(id).pipe(
          tap((producto) => {
            this.formularioService.formulario.patchValue({
              descripcion: producto.descripcion,
              fechaLiberacion: FechasUtils.formatoInput(producto.fechaLiberacion),
              id: producto.id as string,
              logo: producto.logo,
              nombre: producto.nombre
            });
          })
        );
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}


import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioCrear, Producto } from '@app/domain';
import { fechaActualValidator, idValidator, urlValidator } from '../validators';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {
  private formularioCrear!: FormGroup<FormularioCrear>;

  get formulario() {
    return this.formularioCrear;
  }

  constructor(private readonly fb: FormBuilder) { }

  public construirFormulario(editando: boolean = false) {
    this.formularioCrear = this.fb.group({
      descripcion: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(10), Validators.maxLength(200), Validators.required]
      }),
      fechaLiberacion: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, fechaActualValidator()]
      }),
      id: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(3), Validators.maxLength(10), Validators.required],
        asyncValidators: editando ? [] : [idValidator()]
      }),
      logo: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, urlValidator()]
      }),
      nombre: new FormControl('', {
        nonNullable: true,
        validators: [Validators.minLength(5), Validators.maxLength(100), Validators.required],
      }),
    });
  }

  public crearModelo(revision: string): Producto {
    return {
      descripcion: this.formularioCrear.get('descripcion')!.value,
      fechaLiberacion: new Date(this.formularioCrear.get('fechaLiberacion')!.value),
      fechaRevision: new Date(revision),
      id: this.formularioCrear.get('id')!.value,
      logo: this.formularioCrear.get('logo')!.value,
      nombre: this.formularioCrear.get('nombre')!.value,
    };
  }
}

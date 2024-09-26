import { inject } from "@angular/core";
import { AsyncValidatorFn } from "@angular/forms";
import { map } from "rxjs";

import { ProductoService } from "../services/producto.service";

export function idValidator(): AsyncValidatorFn {
  const productoService = inject(ProductoService);
  return (control) => productoService.verificarId(control.value).pipe(
    map((existe) => existe ? {existeId: true} : null)
  )
}

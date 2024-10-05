import { Injectable } from "@angular/core";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";

import { ProductoService } from "@app/application/services/producto.service";
import { Producto, queryKeys, UseCaseHandler } from "@app/domain";

type Args = {
  producto: Producto,
  onSuccess: Function,
}

@Injectable({
  providedIn: 'root'
})
export class GuardarProductoUseCase implements UseCaseHandler {
  private mutation = injectMutation((client) => ({
    mutationFn: (producto: Producto) =>
      lastValueFrom(this.productoService.guardar(producto)),
    onSuccess: () => {
      client.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === queryKeys.PRODUCTO && typeof query.queryKey[1] === 'string',
      });
    }
  }));

  get cargando() {
    return this.mutation.isPending;
  }

  constructor(private readonly productoService: ProductoService) {}

  execute(args: Args) {
    this.mutation.mutate(args.producto, {
      onSuccess: () => args.onSuccess(),
    });
  }
}

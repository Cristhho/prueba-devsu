import { Injectable } from "@angular/core";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";

import { ProductoService } from "@app/application/services/producto.service";
import { Producto, queryKeys, UseCaseHandler } from "@app/domain";

@Injectable({
  providedIn: 'root'
})
export class ActualizarProductoUseCase implements UseCaseHandler {
  private mutation = injectMutation((client) => ({
    mutationFn: ({ id, ...producto }: Producto) =>
      lastValueFrom(this.productoService.modificar(id, producto)),
    onSuccess: (_, {id}: Producto) => {
      client.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === queryKeys.PRODUCTO && typeof query.queryKey[1] === 'string',
      });
      client.invalidateQueries({ queryKey: [queryKeys.PRODUCTO, {id}] });
    }
  }));

  get cargando() {
    return this.mutation.isPending;
  }

  constructor(private readonly productoService: ProductoService) {}

  execute(producto: Producto,) {
    this.mutation.mutate(producto);
  }
}

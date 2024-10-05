import { Injectable } from "@angular/core";
import { injectMutation } from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";

import { ProductoService } from "@app/application/services/producto.service";
import { ID, queryKeys, UseCaseHandler } from "@app/domain";

type Args = {
  id: ID,
  onSuccess: Function,
}

@Injectable({
  providedIn: 'root'
})
export class EliminarProductoUseCase implements UseCaseHandler {
  private mutation = injectMutation((client) => ({
    mutationFn: (id: ID) =>
      lastValueFrom(this.productoService.eliminar(id)),
    onSuccess() {
      client.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === queryKeys.PRODUCTO && typeof query.queryKey[1] === 'string',
      });
    },
  }));

  get cargando() {
    return this.mutation.isPending;
  }

  constructor(private readonly productoService: ProductoService) {}

  execute(args: Args) {
    this.mutation.mutate(args.id, {
      onSuccess: () => args.onSuccess(),
    });
  }
}

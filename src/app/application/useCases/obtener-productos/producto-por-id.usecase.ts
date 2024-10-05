import { Injectable, Signal } from "@angular/core";
import { queryOptions } from "@tanstack/angular-query-experimental";
import { lastValueFrom } from "rxjs";

import { ProductoService } from "@app/application/services/producto.service";
import { ID, queryKeys, UseCaseHandler } from "@app/domain";
import { isEmpty } from "@app/utils";

@Injectable({
  providedIn: 'root'
})
export class ProductoPorIdUseCase implements UseCaseHandler {
  constructor(private readonly productoService: ProductoService) {}

  execute(args: {id: Signal<ID>}) {
    return () => queryOptions({
      enabled: !isEmpty(args.id()),
      queryKey: [queryKeys.PRODUCTO, {id: args.id()}],
      queryFn: () => lastValueFrom(this.productoService.buscarPorId(args.id())),
      retry: 2,
    });
  }
}

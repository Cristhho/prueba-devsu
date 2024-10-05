import { Injectable } from "@angular/core";
import { queryOptions } from '@tanstack/angular-query-experimental';

import { ProductoService } from "@app/application/services/producto.service";
import { queryKeys, UseCaseHandler } from "@app/domain";
import { lastValueFrom } from "rxjs";
import { isEmpty } from "@app/utils";

@Injectable({
  providedIn: 'root'
})
export class ObtenerProductosUseCase implements UseCaseHandler {
  constructor(private readonly productoService: ProductoService) {}

  execute(args: { busqueda?: string }) {
    return () => queryOptions({
      queryKey: [queryKeys.PRODUCTO, args.busqueda],
      queryFn: async () => {
        const productosPromise = lastValueFrom(this.productoService.obtener());
        if (isEmpty(args.busqueda))
          return productosPromise;
        else {
          const productos = await productosPromise;
          return productos.filter((p) => p.nombre.toLowerCase().includes(args.busqueda!));
        }
      },
      staleTime: 15 * 1000,
      retry: false,
    })
  }
}

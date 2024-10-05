import { Injectable, Signal } from "@angular/core";
import { queryOptions } from '@tanstack/angular-query-experimental';
import { lastValueFrom } from "rxjs";

import { ProductoService } from "@app/application/services/producto.service";
import { queryKeys, UseCaseHandler } from "@app/domain";
import { isEmpty } from "@app/utils";

@Injectable({
  providedIn: 'root'
})
export class ObtenerProductosUseCase implements UseCaseHandler {
  constructor(private readonly productoService: ProductoService) {}

  execute({ busqueda }: { busqueda: Signal<string> }) {
    return () => queryOptions({
      queryKey: [queryKeys.PRODUCTO, busqueda()],
      queryFn: async () => {
        const productosPromise = lastValueFrom(this.productoService.obtener());
        if (isEmpty(busqueda()))
          return productosPromise;
        else {
          const productos = await productosPromise;
          return productos.filter((p) => p.nombre.toLowerCase().includes(busqueda().toLowerCase()));
        }
      },
      staleTime: 1000 * 60,
      retry: false,
    })
  }
}

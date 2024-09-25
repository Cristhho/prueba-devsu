import { Injectable } from "@angular/core";

import { Mapeo, Producto } from "@app/domain";
import { ProductoDto } from "@app/domain/dto";
import { FechasUtils } from "@app/utils/fechas";

@Injectable()
export class MapeoProducto implements Mapeo<Producto, ProductoDto> {
  dtoModelo(datos: ProductoDto): Producto {
    return {
      descripcion: datos.description,
      fechaLiberacion: new Date(datos.date_release),
      fechaRevision: new Date(datos.date_revision),
      id: datos.id,
      logo: datos.logo,
      nombre: datos.name,
    };
  }

  modeloDto(modelo: Partial<Producto>): ProductoDto
  modeloDto(modelo: Producto): ProductoDto {
    return {
      date_release: FechasUtils.formato(modelo.fechaLiberacion),
      date_revision: FechasUtils.formato(modelo.fechaRevision),
      description: modelo.descripcion,
      id: modelo.id,
      logo: modelo.logo,
      name: modelo.nombre,
    };
  }
}

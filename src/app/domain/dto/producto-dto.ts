import { ID } from "../repositorioBase";
import { RespuestaBase } from "./respuesta-base";

export type ProductoDto = {
  id: ID;
  name: string;
  description: string;
  logo: string;
  date_release: string;
  date_revision: string;
};

export interface RespuestaProducto extends RespuestaBase<ReadonlyArray<ProductoDto>> {}
export interface RespuestaGuardarProducto extends RespuestaBase<ProductoDto> {}

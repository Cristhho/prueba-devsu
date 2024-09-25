import { ModeloBase } from "./modelo-base";

export type Producto = ModeloBase & {
  nombre: string;
  descripcion: string;
  logo: string;
  fechaLiberacion: Date;
  fechaRevision: Date;
}

import { Observable } from 'rxjs';
import { ModeloBase } from './modelo-base';

export type ID = string | number;

export interface RepositorioBase<T extends ModeloBase> {
  obtener(): Observable<Array<T>>;
  buscarPorId(id: ID): Observable<T>;
  guardar(datos: T): Observable<string>;
  modificar(id: T['id'], datos: Partial<Omit<T, 'id'>>): Observable<string>;
  eliminar(id: ID): Observable<string>;
}

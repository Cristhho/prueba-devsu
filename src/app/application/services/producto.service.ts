import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { MapeoProducto } from '../mapeadores/mapeo-producto';
import { ID, Producto, RepositorioBase } from '@app/domain';
import { RespuestaBase, RespuestaGuardarProducto, RespuestaProducto } from '@app/domain/dto';

@Injectable({
  providedIn: 'root',
})
export class ProductoService implements RepositorioBase<Producto> {
  private readonly url = '/bp/products';
  private productosSubject: BehaviorSubject<Array<Producto>>;

  constructor(
    private readonly http: HttpClient,
    private readonly mapeo: MapeoProducto
  ) {
    const vacio: Array<Producto> = [];
    this.productosSubject = new BehaviorSubject(vacio);
  }

  obtener(): Observable<Producto[]> {
    return this.http.get<RespuestaProducto>(this.url).pipe(
      map((respuesta) => {
        const productos = respuesta.data ?? [];
        return productos.map((p) => this.mapeo.dtoModelo(p))
      }),
      tap((productos) => this.productosSubject.next(productos))
    );
  }

  guardar(datos: Producto): Observable<string> {
    const cuerpo = this.mapeo.modeloDto(datos);
    return this.http.post<RespuestaGuardarProducto>(this.url, cuerpo).pipe(
      map((respuesta) => respuesta.message ?? '')
    );
  }

  modificar(id: Pick<Producto, 'id'>, datos: Partial<Omit<Producto, 'id'>>): Observable<string> {
    const cuerpo = this.mapeo.modeloDto(datos);
    return this.http.put<RespuestaGuardarProducto>(`${this.url}/${id}`, cuerpo).pipe(
      map((respuesta) => respuesta.message!)
    );
  }

  eliminar(id: ID): Observable<string> {
    return this.http.delete<RespuestaBase<void>>(`${this.url}/${id}`).pipe(
      map((respuesta) => respuesta.message!)
    )
  }

  buscar(busqueda: string) {
    busqueda = busqueda.toLowerCase();
    return this.productosSubject.asObservable().pipe(
      map((productos) => productos.filter((p) => p.nombre.toLowerCase().includes(busqueda)))
    );
  }
}

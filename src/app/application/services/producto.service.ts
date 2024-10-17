import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

import { MapeoProducto } from '../mapeadores/mapeo-producto';
import { ID, Producto, RepositorioBase } from '@app/domain';
import { ProductoDto, RespuestaBase, RespuestaGuardarProducto, RespuestaProducto } from '@app/domain/dto';
import { ToastService } from './toast.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService implements RepositorioBase<Producto> {
  private readonly url = `${environment.apiUrl}/bp/products`;

  constructor(
    private readonly http: HttpClient,
    private readonly mapeo: MapeoProducto,
    private readonly toast: ToastService
  ) {}

  obtener(): Observable<Producto[]> {
    return this.http.get<RespuestaProducto>(this.url).pipe(
      map((respuesta) => {
        const productos = respuesta.data ?? [];
        return productos.map((p) => this.mapeo.dtoModelo(p))
      }),
    );
  }

  guardar(datos: Producto): Observable<string> {
    const cuerpo = this.mapeo.modeloDto(datos);
    return this.http.post<RespuestaGuardarProducto>(this.url, cuerpo).pipe(
      map((respuesta) => respuesta.message ?? ''),
      tap(this.mostrarToastExito.bind(this))
    );
  }

  modificar(id: Producto['id'], datos: Partial<Omit<Producto, 'id'>>): Observable<string> {
    const cuerpo = this.mapeo.modeloDto(datos);
    return this.http.put<RespuestaGuardarProducto>(`${this.url}/${id}`, cuerpo).pipe(
      map((respuesta) => respuesta.message!),
      tap(this.mostrarToastExito.bind(this))
    );
  }

  eliminar(id: ID): Observable<string> {
    return this.http.delete<RespuestaBase<void>>(`${this.url}/${id}`).pipe(
      map((respuesta) => respuesta.message!),
      tap(this.mostrarToastExito.bind(this))
    )
  }

  verificarId(id: ID) {
    return this.http.get<boolean>(`${this.url}/verification/${id}`)
  }

  buscarPorId(id: ID) {
    return this.http.get<ProductoDto>(`${this.url}/${id}`).pipe(
      map((respuesta) => {
        return this.mapeo.dtoModelo(respuesta);
      }),
    );
  }

  private mostrarToastExito(mensaje: string) {
    this.toast.add({
      message: mensaje,
      type: 'success'
    })
  }
}

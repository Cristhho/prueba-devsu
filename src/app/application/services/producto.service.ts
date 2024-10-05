import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, tap } from 'rxjs';

import { MapeoProducto } from '../mapeadores/mapeo-producto';
import { ID, Producto, RepositorioBase } from '@app/domain';
import { RespuestaBase, RespuestaGuardarProducto, RespuestaProducto } from '@app/domain/dto';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class ProductoService implements RepositorioBase<Producto> {
  private readonly url = '/bp/products';
  private cargandoSubject = new BehaviorSubject<boolean>(false);
  cargando$ = this.cargandoSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly mapeo: MapeoProducto,
    private readonly toast: ToastService
  ) {}

  mostarCarga() {
    this.cargandoSubject.next(true);
  }

  esconderCarga() {
    this.cargandoSubject.next(false);
  }

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
    return this.obtener().pipe(
      map((productos) => {
        const producto = productos.find((p) => p.id === id);
        if (!producto) throw new Error('Producto no existe');
        else return producto;
      }),
      catchError((err: Error) => {
        this.toast.add({
          message: err.message,
          type: 'error'
        });
        throw err;
      })
    );
  }

  private mostrarToastExito(mensaje: string) {
    this.toast.add({
      message: mensaje,
      type: 'success'
    })
  }
}

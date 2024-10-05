import { ComponentFixture, fakeAsync, flush, TestBed } from "@angular/core/testing";
import { provideQueryClient } from "@tanstack/angular-query-experimental";
import { By } from "@angular/platform-browser";

import { TablaProductosComponent } from "./tabla-productos.component";
import { findAllByQuery, findByQuery, getElementTextByDebug } from "../../../../test";
import { producto } from "../../../../test/datos-simulados";
import { ObtenerProductosUseCase } from "@app/application/useCases";
import { Producto } from "@app/domain";
import { crearQueryOptions, queryClient } from "../../../../test/tanstack";

describe('TablaProductosComponent', () => {
  let component: TablaProductosComponent;
  let fixture: ComponentFixture<TablaProductosComponent>;
  let obtenerUseCase: jasmine.SpyObj<ObtenerProductosUseCase>;

  describe('Cuando se obtenga un arreglo de productos vacio', () => {
    beforeEach(fakeAsync(async () => {
      const obtenerUseCaseSpy = jasmine.createSpyObj('ObtenerProductosUseCase', ['execute']);
      obtenerUseCaseSpy.execute.and.returnValue(() => crearQueryOptions<Array<Producto>>([undefined], []));
      TestBed.configureTestingModule({
        providers: [
          provideQueryClient(queryClient),
          { provide: ObtenerProductosUseCase, useValue: obtenerUseCaseSpy },
        ],
      });
      fixture = TestBed.createComponent(TablaProductosComponent);
      fixture.componentRef.setInput('busqueda', '');
      component = fixture.componentInstance;
      obtenerUseCase = TestBed.inject(ObtenerProductosUseCase) as jasmine.SpyObj<ObtenerProductosUseCase>;
      flush();
      fixture.detectChanges();
    }));

    it('debe crear el componente', () => {
      expect(component).toBeTruthy();
      expect(obtenerUseCase.execute).toHaveBeenCalled();
    });

    it('debe retornar un arreglo vacio', () => {
      expect(component.productos.status()).toBe('success');
      expect(component.datos()?.length).toBe(0);
    });

    it('debe mostrar un mensaje de que no hay productos', () => {
      fixture.detectChanges();

      const debug = findByQuery(fixture, '.tabla--vacio');
      const mensaje = getElementTextByDebug(debug.query(By.css('span')));
      expect(mensaje).toContain("No existen");
    });
  });

  describe('Cuando se tenga al menos 1 producto', () => {
    let fixture: ComponentFixture<TablaProductosComponent>;
    const productos = [producto];

    beforeEach(fakeAsync(async () => {
      const obtenerUseCaseSpy = jasmine.createSpyObj('ObtenerProductosUseCase', ['execute']);
      obtenerUseCaseSpy.execute.and.returnValue(() => crearQueryOptions<Array<Producto>>([undefined], productos));
      TestBed.configureTestingModule({
        providers: [
          provideQueryClient(queryClient),
          { provide: ObtenerProductosUseCase, useValue: obtenerUseCaseSpy },
        ],
      });
      fixture = TestBed.createComponent(TablaProductosComponent);
      fixture.componentRef.setInput('busqueda', '');
      flush();
      fixture.detectChanges();
    }));

    it('debe tener n cantidad de filas en la tabla', () => {
      const debug = findAllByQuery(fixture, 'tbody tr');
      expect(debug.length).toEqual(productos.length);
    });

    it('debe mostrar la informacion del producto', () => {
      const producto = productos[0];
      const debug = findByQuery(fixture, 'tbody tr');
      const celdas = debug.queryAll(By.css("td"));
      const imagen = celdas[0].query(By.css("img")).nativeElement as HTMLImageElement;
      expect(imagen.src).toBe(producto.logo);
      expect(celdas[1].nativeElement.textContent).toBe(producto.nombre);
      expect(celdas[2].nativeElement.textContent).toBe(producto.descripcion);
    })
  });
});


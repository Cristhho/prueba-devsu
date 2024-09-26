import { ComponentFixture, TestBed } from "@angular/core/testing";

import { TablaProductosComponent } from "./tabla-productos.component";
import { ProductoService } from "@app/application/services/producto.service";
import { findAllByQuery, findByQuery, getElementTextByDebug, mockObservable } from "../../../../test";
import { By } from "@angular/platform-browser";
import { producto } from "../../../../test/datos-simulados";

describe('TablaProductosComponent', () => {
  let component: TablaProductosComponent;
  let fixture: ComponentFixture<TablaProductosComponent>;
  let productoService: jasmine.SpyObj<ProductoService>;

  beforeEach(() => {
    const productoServiceSpy = jasmine.createSpyObj('ProductoService', ['obtener', 'buscar']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ProductoService, useValue: productoServiceSpy }
      ]
    });
    fixture = TestBed.createComponent(TablaProductosComponent);
    component = fixture.componentInstance;
    productoService = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
  });

  it('debe crear el componente', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
    expect(productoService.obtener).toHaveBeenCalled();
  });

  describe('Cuando se obtengan los productos', () => {
    it('debe retornar un arreglo vacio', (done: DoneFn) => {
      productoService.obtener.and.returnValue(mockObservable([]));
      fixture.detectChanges();
      component.productos$.subscribe((v) => {
        expect(v.length).toEqual(0);
        done();
      });
    });
    it('debe mostrar un mensaje de que no hay productos', () => {
      productoService.obtener.and.returnValue(mockObservable([]));
      productoService.buscar.and.returnValue(mockObservable([]))
      fixture.detectChanges();

      expect(productoService.buscar).toHaveBeenCalledWith('');
      const debug = findByQuery(fixture, '.tabla--vacio');
      const mensaje = getElementTextByDebug(debug.query(By.css('span')));
      expect(mensaje).toContain("No existen");
    });

    describe('y exista al menos 1', () => {
      const productos = [producto];
      beforeEach(() => {
        productoService.obtener.and.returnValue(mockObservable(productos));
        productoService.buscar.and.returnValue(mockObservable(productos));
        fixture.detectChanges();
      });

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
});

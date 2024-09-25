import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { ProductoService } from './producto.service';
import { environment } from '../../../environments/environment';
import { MapeoProducto } from '../mapeadores/mapeo-producto';
import { apiUrlInterceptor } from '../interceptor';
import { producto, productoDto } from '../../../test/datos-simulados';
import { RespuestaGuardarProducto } from '@app/domain/dto';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('ProductoService', ['obtener'])
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiUrlInterceptor])),
        provideHttpClientTesting(),
        MapeoProducto
      ],
    });
    service = TestBed.inject(ProductoService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  })

  it('debe realizar la peticion', async () => {
    const productos$ = service.obtener();
    const productosPromise = firstValueFrom(productos$);

    const req = httpController.expectOne(`${environment.apiUrl}/bp/products`);
    expect(req.request.method).toBe('GET');
    req.flush([])
    expect(await productosPromise).toEqual([]);
  });

  describe('cuando se intente crear un nuevo producto', () => {
    it('debe crear el producto y retornar un mensaje exitoso', (done: DoneFn) => {
      const mockData = producto;
      const respuesta: RespuestaGuardarProducto = {
        data: productoDto,
        message: 'creado con exito',
      }

      service.guardar({...mockData}).subscribe((data) => {
        expect(data).toEqual('creado con exito')
        done();
      });

      const req = httpController.expectOne(`${environment.apiUrl}/bp/products`);
      req.flush(respuesta);
      expect(req.request.method).toEqual('POST');
      expect(req.request.body.name).toEqual(respuesta.data.name);
    })
  });

  describe('cuando se intente eliminar un producto', () => {
    it('debe eliminar el producto y retornar un mensaje', (done: DoneFn) => {
      service.eliminar('1').subscribe((data) => {
        expect(data).toEqual('')
        done();
      });

      const req = httpController.expectOne(`${environment.apiUrl}/bp/products/1`);
      req.flush({message: ''});
      expect(req.request.method).toEqual('DELETE');
    });
  })
});

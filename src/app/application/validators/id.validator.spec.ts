import { TestBed } from "@angular/core/testing";

import { ProductoService } from "../services/producto.service";
import { mockObservable } from "../../../test";
import { idValidator } from "./id.validator";
import { AbstractControl, ValidationErrors } from "@angular/forms";
import { lastValueFrom, Observable } from "rxjs";

describe("idValidator", () => {
  let productoServicio: jasmine.SpyObj<ProductoService>;
  beforeEach(() => {
    const servicioSpy = jasmine.createSpyObj("ProductoService", ['verificarId']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ProductoService,
          useValue: servicioSpy,
        },
      ],
    });
    productoServicio = TestBed.inject(ProductoService) as jasmine.SpyObj<ProductoService>;
  });

  it("debe validar que es un id que ya existe", () => {
    productoServicio.verificarId.and.returnValue(mockObservable(true));
    TestBed.runInInjectionContext(async () => {
      const validator = idValidator();
      const resultado$ = validator({value: 1} as AbstractControl) as Observable<ValidationErrors | null>;
      const resultado = await lastValueFrom(resultado$);
      expect(resultado).not.toBeNull();
      const props = Object.keys(resultado!);
      expect(props[0]).toBe('existeId');
    });
  });

  it("debe retornar null", () => {
    productoServicio.verificarId.and.returnValue(mockObservable(false));
    TestBed.runInInjectionContext(async () => {
      const validator = idValidator();
      const resultado = validator({value: 1} as AbstractControl) as Observable<ValidationErrors | null>;
      expect(await lastValueFrom(resultado)).toBeNull();
    });
  });
});

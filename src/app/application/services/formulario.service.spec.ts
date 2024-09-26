import { TestBed } from "@angular/core/testing";
import { FormularioService } from "./formulario.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductoService } from "./producto.service";

describe('ToastService', () => {
  let service: FormularioService;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj("ProductoService", ["verificarId"])
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      providers: [
        { provide: ProductoService, useValue: serviceSpy },
      ],
    });
    service = TestBed.inject(FormularioService);
  });

  it('debe crear la instancia', () => {
    expect(service).toBeTruthy();
  });

  it('debe crear el formulario', () => {
    TestBed.runInInjectionContext(() => {
      service.construirFormulario();
    });

    expect(service.formulario).toBeDefined();
  });

  it('debe retornar un producto', () => {
    TestBed.runInInjectionContext(() => {
      service.construirFormulario();
    });
    const producto = service.crearModelo('2025-01-01');
    expect(producto.id).toBe('');
  })
});

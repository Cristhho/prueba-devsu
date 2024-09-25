import { producto, productoDto } from "../../../test/datos-simulados";
import { MapeoProducto } from "./mapeo-producto";

describe('Mapeo de producto', () => {
  let mapeo: MapeoProducto;

  beforeEach(() => {
    mapeo = new MapeoProducto();
  });

  it('debe crear la instancia', () => {
    expect(mapeo).toBeTruthy();
  });

  it('debe llamar al metodo dtoModelo', () => {
    const spy = spyOn(mapeo, 'dtoModelo');
    mapeo.dtoModelo(productoDto);
    expect(spy).toHaveBeenCalled();
  });

  it('debe retornar un modelo de producto', () => {
    const prod = mapeo.dtoModelo(productoDto);
    expect(prod).toEqual(producto);
  });
});

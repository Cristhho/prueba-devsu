import { AbstractControl } from "@angular/forms";

import { urlValidator } from "./url.validator";

describe("fechaActualValidator", () => {
  const validator = urlValidator();
  it('debe retornar null', () => {
    let control = { value: 'http://dominio.com' }
    const resultado = validator(control as AbstractControl);
    expect(resultado).toBeNull();
  });

  it('debe retornar un objeto con la propiedad url', () => {
    let control = { value: 'no es una url' }
    const resultado = validator(control as AbstractControl);
    expect(resultado).not.toBeNull();
    const props = Object.keys(resultado!);
    expect(props[0]).toBe('url');
  })
});

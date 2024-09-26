import { AbstractControl } from "@angular/forms";

import { fechaActualValidator } from "./fecha-actual.validator";
import { FechasUtils } from "@app/utils/fechas";

describe("fechaActualValidator", () => {
  const validator = fechaActualValidator();
  it('debe retornar null', () => {
    let control = { value: FechasUtils.formatoInput(new Date()) }
    const resultado = validator(control as AbstractControl);
    expect(resultado).toBeNull();
  });

  it('debe retornar un objeto con la propiedad fecha', () => {
    let control = { value: '01/01/2024' }
    const resultado = validator(control as AbstractControl);
    expect(resultado).not.toBeNull();
    const props = Object.keys(resultado!);
    expect(props[0]).toBe('fecha');
  })
});

import { ValidatorFn } from "@angular/forms";

export function fechaActualValidator(): ValidatorFn {
  const hoy = new Date();
  hoy.setMilliseconds(0);
  hoy.setSeconds(0);
  hoy.setMinutes(0);
  hoy.setHours(0)
  return (control) => {
    try {
      const fecha = new Date(control.value);
      fecha.setHours(23);
      fecha.setMinutes(59);
      fecha.setSeconds(59);
      return fecha.getTime() < (hoy.getTime() - (1000 * 1)) ? { fecha: true } : null;
    } catch (errr) {
      return { fecha: true };
    }
  }
}

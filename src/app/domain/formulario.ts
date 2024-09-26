import { FormControl } from "@angular/forms";

export type FormularioCrear = {
  id: FormControl<string>,
  nombre: FormControl<string>;
  descripcion: FormControl<string>;
  logo: FormControl<string>;
  fechaLiberacion: FormControl<string>;
};

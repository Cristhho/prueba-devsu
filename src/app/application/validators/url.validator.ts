import { ValidatorFn } from "@angular/forms";
import { urlRegex } from "@app/utils/regex";

export function urlValidator(): ValidatorFn {
  return (control) => urlRegex.test(control.value) ? null : { url: true }
}

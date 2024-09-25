import { Injectable } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

import { FormErrors } from '@app/domain';
import { isEmpty } from '@app/utils';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorService {
  public getErrorMessage(errors?: ValidationErrors | null): string {
    if (!errors || isEmpty(errors)) {
      return '';
    }
    const firstError = Object.keys(errors)[0];
    switch (firstError) {
      case 'required':
        return FormErrors.REQUIRED;
      case 'email':
        return FormErrors.EMAIL;
      case 'min':
        return `${FormErrors.MIN}${errors['min'].min}`;
      case 'max':
        return `${FormErrors.MAX}${errors['max'].max}`;
      default:
        return 'Error desconocido';
    }
  }
}

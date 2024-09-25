import { CommonModule } from '@angular/common';
import { Component, Injector, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseInputComponent } from '../base-input.component';
import { BlurHandler } from '@app/domain';
import { FormInputErrorDirective } from '@app/infrastructure/directives/form-input-error.directive';

type IconPosition = 'left' | 'right';
type InputType = 'text' | 'url' | 'email' | 'tel';

@Component({
  selector: 'core-input-text',
  standalone: true,
  imports: [CommonModule, FormInputErrorDirective],
  templateUrl: './input-text.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputTextComponent,
    },
  ],
})
export class InputTextComponent
  extends BaseInputComponent
  implements BlurHandler
{
  @Input()
  iconPos?: IconPosition;

  @Input()
  icon: string = '';

  @Input()
  inputType: InputType = 'text';

  value = '';

  @ViewChild(FormInputErrorDirective)
  private childDirective!: FormInputErrorDirective;

  constructor(override readonly injector: Injector) {
    super(injector);
  }

  public onChangeHandler(event: Event) {
    const target = event.target as HTMLInputElement;
    this.onChange(target.value);
  }

  public onBlurHandler(): void {
    this.onTouched();
    this.childDirective.onBlur();
  }
}

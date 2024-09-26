import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Injector, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseInputComponent } from '../base-input.component';
import { BlurHandler } from '@app/domain';
import { FormInputErrorDirective } from '@app/infrastructure/directives';

type InputType = 'text' | 'url' | 'email' | 'tel' | 'date';

@Component({
  selector: 'app-input-text',
  standalone: true,
  imports: [CommonModule, FormInputErrorDirective],
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css',
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
  @ViewChild('inputRef')
  private inputRef!: ElementRef<HTMLInputElement>;

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

  override writeValue(value: string) {
    super.writeValue(value);
    if (this.inputRef) {
      this.inputRef.nativeElement.value = value;
    }
  }
}

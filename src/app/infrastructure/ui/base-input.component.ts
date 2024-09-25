import { Component, Injector, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControlDirective,
  FormControlName,
  FormGroupDirective,
  NgControl,
} from '@angular/forms';

import { classError } from '@app/domain/constantes';

@Component({
  template: '',
})
export abstract class BaseInputComponent
  implements ControlValueAccessor, OnInit
{
  @Input()
  disabled: boolean = false;

  @Input()
  label?: string;

  @Input({ required: true })
  inputId!: string;

  @Input()
  placeholder: string = '';

  public formControl!: AbstractControl;
  abstract value: unknown;
  protected onChange!: (value: unknown) => void;
  public onTouched!: () => void;

  get isInvalid() {
    return this.formControl.invalid && this.formControl.touched;
  }

  get errorClass() {
    return this.isInvalid ? classError : '';
  }

  constructor(protected readonly injector: Injector) {}

  ngOnInit(): void {
    const ngControl = this.injector.get(NgControl);
    if (ngControl instanceof FormControlName) {
      this.formControl = this.injector
        .get(FormGroupDirective)
        .getControl(ngControl);
    } else {
      this.formControl = (ngControl as FormControlDirective).form;
    }
  }

  writeValue(value: unknown): void {
    this.value = value;
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  abstract onChangeHandler(event: unknown): void;
}

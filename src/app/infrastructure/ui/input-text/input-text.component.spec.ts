import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';

import { InputTextComponent } from './input-text.component';
import { configureControlValueAccesorTests } from '../../../../test/control-value-accesor.spec';
import { findByQuery, setInputValue } from '../../../../test';

describe('InputTextComponent', () => {
  let onChangeSpy: jasmine.Spy;
  let onTouchedSpy: jasmine.Spy;

  let component: InputTextComponent;
  let fixture: ComponentFixture<InputTextComponent>;

  configureControlValueAccesorTests({ component: InputTextComponent });

  beforeEach(() => {
    onChangeSpy = jasmine.createSpy('onChangeSpy');
    onTouchedSpy = jasmine.createSpy('onTouchedSpy');

    fixture = TestBed.createComponent(InputTextComponent);
    component = fixture.componentInstance;
    component.inputId = 'test';
    fixture.detectChanges();
  });

  it('should call the register methods', () => {
    const spyRegisterChange = spyOn(component, 'registerOnChange');
    const spyRegisterTouch = spyOn(component, 'registerOnTouched');

    component.registerOnChange(onChangeSpy);
    component.registerOnTouched(onTouchedSpy);

    expect(spyRegisterChange).toHaveBeenCalledOnceWith(onChangeSpy);
    expect(spyRegisterTouch).toHaveBeenCalledOnceWith(onTouchedSpy);
    expect(onChangeSpy).toHaveBeenCalledTimes(0);
    expect(onTouchedSpy).toHaveBeenCalledTimes(0);
  });

  describe('when register ControlValueAccessor methods', () => {
    beforeEach(() => {
      component.registerOnChange(onChangeSpy);
      component.registerOnTouched(onTouchedSpy);
    });

    it('should register on touch as a function', () => {
      expect(component.onTouched).toBeDefined();
      expect(typeof component.onTouched).toBe('function');
    });

    it('should call onBlurHandler', () => {
      const inputElement: HTMLInputElement = findByQuery(
        fixture,
        'input'
      ).nativeElement;
      const blurEvent = new Event('blur');

      inputElement.dispatchEvent(blurEvent);

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
      expect(onTouchedSpy).toHaveBeenCalled();
    });

    it('should indicate the input is invalid', () => {
      component.formControl.setValidators(Validators.required);
      component.formControl.updateValueAndValidity();

      expect(onChangeSpy).toHaveBeenCalledTimes(0);
      expect(onTouchedSpy).toHaveBeenCalledTimes(0);
      expect(component.formControl.status).toBe('INVALID');
    });

    it('should change the input value', () => {
      const value = 'test';
      const input = findByQuery(fixture, 'input')
        .nativeElement as HTMLInputElement;
      const changeSpy = spyOn(component, 'onChangeHandler');
      const inputEvent = new Event('input');
      setInputValue({ fixture, selector: 'input', value, event: inputEvent });
      component.formControl.setValue(value);
      component.formControl.updateValueAndValidity();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy).toHaveBeenCalledWith(inputEvent);
      expect(onTouchedSpy).toHaveBeenCalledTimes(1);
      expect(input.value).toBe(value);
      expect(component.formControl.value).toBe(value);
      expect(component.formControl.valid).toBeTrue();
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { FormInputErrorDirective } from './form-input-error.directive';
import { findByDirective, findByQuery, setInputValue } from '../../../test';
import { FormErrors } from '@app/domain';

@Component({
  standalone: true,
  imports: [FormInputErrorDirective],
  template: `<div>
    <input coreFormInputError [inputControl]="control" />
  </div>`,
})
class TestComponent {
  control = new FormControl('', [Validators.required]);
}

describe('FormInputErrorDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let component: TestComponent;
  let directive: FormInputErrorDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent, FormInputErrorDirective],
    }).createComponent(TestComponent);

    debugElement = findByDirective(fixture, FormInputErrorDirective);
    component = fixture.componentInstance;
    directive = debugElement.injector.get(FormInputErrorDirective);
    fixture.detectChanges();
  });

  it('should create the component and the directive', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('should trigger the blur event', () => {
    const spy = spyOn(directive, 'onBlur');

    debugElement.triggerEventHandler('blur');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  describe('when touch the input withou setting a value', () => {
    beforeEach(() => {
      debugElement.triggerEventHandler('blur');
      fixture.detectChanges();
    });

    it('should add a span element', () => {
      const span = findByQuery(fixture, 'span');

      expect(span).toBeTruthy();
    });

    it('should show a required input message', () => {
      const span = findByQuery(fixture, 'span').nativeElement as HTMLElement;
      const text = span.textContent;

      expect(text).toBe(FormErrors.REQUIRED);
    });
  });

  describe('when set a valid value to the input', () => {
    const value = 'change';

    beforeEach(() => {
      setInputValue({ fixture, selector: 'input', value });
      directive.inputControl.setValue(value);
      fixture.detectChanges();
    });

    it('should change the form control state to valid', () => {
      const state = directive.inputControl.status;

      expect(state).toEqual('VALID');
      expect(directive.inputControl.value).toBe(value);
    });
  });
});

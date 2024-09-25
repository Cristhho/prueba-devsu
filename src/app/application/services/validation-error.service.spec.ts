import { TestBed } from '@angular/core/testing';

import { ValidationErrorService } from './validation-error.service';
import { FormErrors } from '@app/domain';

describe('ValidationErrorsService', () => {
  let service: ValidationErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorService);
  });

  it('should return an empty string', () => {
    const message = service.getErrorMessage({});

    expect(message.length).toBe(0);
    expect(message).toBeFalsy();
  });

  it('should recive an null errors object and return an empty string', () => {
    const message = service.getErrorMessage(null);

    expect(message.length).toBe(0);
    expect(message).toBeFalsy();
  });

  it('should check the first error and return a message string', () => {
    const message = service.getErrorMessage({ foo: '', bar: '' });

    expect(message).toBeTruthy();
    expect(typeof message).toBe('string');
    expect(message.length).toBeGreaterThan(0);
  });

  it('should return the message "Error desconocido"', () => {
    const message = service.getErrorMessage({ error: true });

    expect(message).toBe('Error desconocido');
  });

  it('should return required message', () => {
    const message = service.getErrorMessage({ required: true });

    expect(message).toBe(FormErrors.REQUIRED);
  });
});

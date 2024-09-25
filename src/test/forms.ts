import { ComponentFixture } from '@angular/core/testing';

import { findByQuery } from './finders';

type SetInputValueOptions<T> = {
  fixture: ComponentFixture<T>;
  selector: string;
  value: string;
  event?: Event;
};

export const setInputValue = <T>({
  fixture,
  selector,
  value,
  event,
}: SetInputValueOptions<T>) => {
  const input = findByQuery(fixture, selector);
  const inputElement: HTMLInputElement = input.nativeElement;
  inputElement.value = value;
  inputElement.dispatchEvent(event ? event : new Event('input'));
  inputElement.dispatchEvent(new Event('blur'));
};

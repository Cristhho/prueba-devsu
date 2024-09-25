import { DebugElement, Type } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const findByQuery = <T>(
  fixture: ComponentFixture<T>,
  selector: string
) => {
  return fixture.debugElement.query(By.css(selector));
};

export const findAllByQuery = <T>(
  fixture: ComponentFixture<T>,
  selector: string
) => {
  return fixture.debugElement.queryAll(By.css(selector));
};

export const findByDirective = <T, D>(
  fixture: ComponentFixture<T>,
  directive: Type<D>
) => {
  return fixture.debugElement.query(By.directive(directive));
};

export const findAllByDirective = <T, D>(
  fixture: ComponentFixture<T>,
  directive: Type<D>
) => {
  return fixture.debugElement.queryAll(By.directive(directive));
};

export const getElementTextByDebug = (debugElement: DebugElement) => {
  const element: HTMLElement = debugElement.nativeElement;
  return element.textContent;
};

export const getElementText = <T>(
  fixture: ComponentFixture<T>,
  selector: string
) => {
  const debug = findByQuery(fixture, selector);
  const element: HTMLElement = debug.nativeElement;
  return element.textContent;
};

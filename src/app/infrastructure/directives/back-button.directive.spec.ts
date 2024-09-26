import { Component, DebugElement } from "@angular/core";
import { BackButtonDirective } from "./back-button.directive";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { findByDirective } from "../../../test";

@Component({
  standalone: true,
  imports: [BackButtonDirective],
  template: `<span coreBackButton></span>`,
})
class TestComponent {}

describe('BackButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let debugElement: DebugElement;
  let component: TestComponent;
  let directive: BackButtonDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      imports: [TestComponent, BackButtonDirective],
    }).createComponent(TestComponent);

    debugElement = findByDirective(fixture, BackButtonDirective);
    component = fixture.componentInstance;
    directive = debugElement.injector.get(BackButtonDirective);
    fixture.detectChanges();
  });

  it('debe crear el componente y la directiva', () => {
    expect(component).toBeTruthy();
    expect(directive).toBeTruthy();
  });

  it('debe disparar el evento click', () => {
    const spy = spyOn(directive, 'onClick');

    debugElement.triggerEventHandler('click');
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });
})

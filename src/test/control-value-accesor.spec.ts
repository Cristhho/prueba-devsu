import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Provider, Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FormControl, NgControl } from '@angular/forms';
import { FormInputErrorDirective } from '@app/infrastructure/directives/form-input-error.directive';

type ConfigureControlValueAccesorOptions<T> = {
  component: Type<T>;
};

export function configureControlValueAccesorTests<Component>({
  component,
}: ConfigureControlValueAccesorOptions<Component>) {
  const directiveSpy = jasmine.createSpyObj('FormInputErrorDirective', [
    'ngOnInit',
    'onBlur',
  ]);
  let NG_CONTROL_PROVIDER: Provider;

  beforeEach(() => {
    NG_CONTROL_PROVIDER = {
      provide: NgControl,
      useClass: class extends NgControl {
        form = new FormControl();
        control = this.form;
        viewToModelUpdate() {}
      },
    };
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, component],
      providers: [
        {
          provide: FormInputErrorDirective,
          useValue: directiveSpy,
        },
      ],
    })
      .overrideComponent(component, {
        add: { providers: [NG_CONTROL_PROVIDER] },
      })
      .compileComponents();
  });
}

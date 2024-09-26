import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Injectable, Type } from '@angular/core';

import { ComponentInputs, ModalProps } from '@app/domain';
import { ModalComponent } from '@app/infrastructure/ui/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  newModalComponent!: ComponentRef<ModalComponent>;
  options!: ModalProps | undefined;

  constructor(
    private appRef: ApplicationRef,
    private injector: EnvironmentInjector
  ) { }

  open<C>(vcrOrComponent: Type<C>, options: ModalProps) {
    this.openWithComponent(vcrOrComponent, options.inputs);
    this.options = options;
  }

  private openWithComponent(component: Type<unknown>, inputs?: ComponentInputs) {
    const newComponent = createComponent(component, {
      environmentInjector: this.injector,
    });
    if (inputs) {
      for (const input in inputs) {
        (newComponent.instance as any)[input] = inputs[input];
      }
    }

    this.newModalComponent = createComponent(ModalComponent, {
      environmentInjector: this.injector,
      projectableNodes: [[newComponent.location.nativeElement]],
    });

    document.body.appendChild(this.newModalComponent.location.nativeElement);

    this.appRef.attachView(newComponent.hostView);
    this.appRef.attachView(this.newModalComponent.hostView);
  }

  close() {
    this.newModalComponent.instance.close();
  }
}

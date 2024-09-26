import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';

import { ModalService } from '@app/application/services/modal.service';
import { ModalEstilos } from '@app/domain';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modal') modal!: ElementRef<HTMLDivElement>;
  options!: ModalEstilos | undefined;

  constructor(
    private modalService: ModalService,
    private element: ElementRef
  ) {}

  ngAfterViewInit(): void {
    this.options = this.modalService.options;
    this.modal.nativeElement.style.minWidth =
      this.options?.size?.minWidth || 'auto';
    this.modal.nativeElement.style.width =
      this.options?.size?.width || 'auto';
    this.modal.nativeElement.style.maxWidth =
      this.options?.size?.maxWidth || 'auto';
    this.modal.nativeElement.style.minHeight =
      this.options?.size?.minHeight || 'auto';
    this.modal.nativeElement.style.height =
      this.options?.size?.height || 'auto';
    this.modal.nativeElement.style.maxHeight =
      this.options?.size?.maxHeight || 'auto';
  }

  @HostListener('document:keydown.escape')
  onEscape() {
    this.modalService.close();
  }

  onClose() {
    this.modalService.close();
  }

  close() {
    this.modalService.options = undefined;
    this.element.nativeElement.remove();
  }
}

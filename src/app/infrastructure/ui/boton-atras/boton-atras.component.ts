import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BackButtonDirective } from '@app/infrastructure/directives';

@Component({
  selector: 'app-boton-atras',
  standalone: true,
  imports: [
    CommonModule,
    BackButtonDirective
  ],
  templateUrl: './boton-atras.component.html',
  styleUrl: './boton-atras.component.css',
})
export class BotonAtrasComponent { }


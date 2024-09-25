import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BotonComponent } from "../../ui/boton/boton.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    BotonComponent
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent { }


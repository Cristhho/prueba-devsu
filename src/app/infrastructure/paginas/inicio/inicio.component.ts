import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { BotonComponent } from "../../ui/boton/boton.component";
import { InputTextComponent } from "../../ui/input-text/input-text.component";
import { TablaProductosComponent } from "../../ui/tabla-productos/tabla-productos.component";

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    CommonModule,
    BotonComponent,
    FormsModule,
    InputTextComponent,
    ReactiveFormsModule,
    TablaProductosComponent
],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  public busqueda = new FormControl('');

  constructor(private readonly router: Router) {}

  public onCrearClick() {
    this.router.navigate(['/crear']);
  }
}


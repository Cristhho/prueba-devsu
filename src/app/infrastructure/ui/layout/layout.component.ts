import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CabeceraComponent,
    RouterOutlet,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent { }


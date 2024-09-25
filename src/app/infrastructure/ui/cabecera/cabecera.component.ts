import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-cabecera',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './cabecera.component.html',
  styleUrl: './cabecera.component.css',
})
export class CabeceraComponent {
  public appName = environment.appName;
}


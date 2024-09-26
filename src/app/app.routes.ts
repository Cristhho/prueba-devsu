import { Routes } from '@angular/router';
import { LayoutComponent } from './infrastructure/ui';

export const routes: Routes = [
  {
    component: LayoutComponent,
    path: '',
    title: 'Inicio',
    children: [
      {
        loadComponent: async () => (await import('@app/infrastructure/paginas')).InicioComponent,
        path: '',
        pathMatch: 'full',
      },
      {
        loadComponent: async () => (await import('@app/infrastructure/paginas')).CrearComponent,
        path: 'crear',
        pathMatch: 'full',
      },
      {
        loadComponent: async () => (await import('@app/infrastructure/paginas')).EditarComponent,
        path: ':id'
      }
    ],
  },
];

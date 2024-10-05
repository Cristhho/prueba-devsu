import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';

import { routes } from './app.routes';
import { apiErrorInterceptor, apiUrlInterceptor } from './application/interceptor';
import { MapeoProducto } from './application/mapeadores/mapeo-producto';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
    provideHttpClient(withInterceptors([
      apiUrlInterceptor,
      apiErrorInterceptor
    ])),
    provideAngularQuery(new QueryClient({
      defaultOptions: {
        queries: { refetchOnWindowFocus: false, }
      }
    })),
    MapeoProducto
  ]
};

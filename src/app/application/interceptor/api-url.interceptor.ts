import type { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const esProduccion = environment.production;
  return next(req.clone({ url: `${esProduccion ? environment.apiUrl : ''}${req.url}` }));
};

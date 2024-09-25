import type { HttpInterceptorFn } from '@angular/common/http';

import { environment } from '../../../environments/environment';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ url: `${environment.apiUrl}${req.url}` }));
};

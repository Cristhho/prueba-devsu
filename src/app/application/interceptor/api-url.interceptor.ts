import type { HttpInterceptorFn } from '@angular/common/http';

export const apiUrlInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req.clone({ url: `${req.url}` }));
};

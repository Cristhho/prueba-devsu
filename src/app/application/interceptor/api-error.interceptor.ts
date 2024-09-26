import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { catchError } from "rxjs";

import { ToastService } from "../services/toast.service";

export const apiErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastService = inject(ToastService);
  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      if (!err.error) toastService.add({
        message: `Ocurrio un error: ${err.statusText}`,
        type: 'error'
      });
      else
        toastService.add({
          message: `Código de error: ${err.status}, ${JSON.stringify(err.error)}`,
          type: 'error',
          duration: 7000
        });
      throw err;
    })
  )
};

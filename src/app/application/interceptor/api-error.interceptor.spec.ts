import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, HttpErrorResponse, provideHttpClient, withInterceptors } from "@angular/common/http";

import { apiErrorInterceptor } from "./api-error.interceptor";
import { ToastService } from "../services/toast.service";

describe('apiUrlInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;
  const toastSpy = jasmine.createSpyObj("ToastService", ["add"]);
  const url = '/mockendpoint';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: ToastService, useValue: toastSpy }
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe terminar la peticion con un error 400', (done: DoneFn) => {
    httpClient.get(url).subscribe({
      error(err: HttpErrorResponse) {
        expect(err.status).toBe(400);
        done();
      },
    });
    const req = httpTestingController.expectOne(url);
    req.flush(null, {status: 400, statusText: 'Unknown Error'});
    expect(toastSpy.add).toHaveBeenCalled();
    expect(toastSpy.add).toHaveBeenCalledWith({
      message: `Ocurrio un error: Unknown Error`,
      type: 'error'
    });
  });

  it('debe terminar la peticion con un error de API', (done: DoneFn) => {
    const errorMsg = 'Error from API';
    httpClient.get(url).subscribe({
      error(err) {
        expect(err.status).toBe(500);
        done();
      },
    });
    const req = httpTestingController.expectOne(url);
    req.flush({message: errorMsg}, {status: 500, statusText: 'API error'});
    expect(toastSpy.add).toHaveBeenCalled();
    expect(toastSpy.add).toHaveBeenCalledWith({
      message: `Código de error: 500, ${errorMsg}`,
      type: 'error',
      duration: 7000
    });
  });
});

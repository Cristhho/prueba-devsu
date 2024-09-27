import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import { HttpClient, provideHttpClient, withInterceptors } from "@angular/common/http";

import { apiUrlInterceptor } from "./api-url.interceptor";
import { environment } from "../../../environments/environment";

describe('apiUrlInterceptor', () => {
  let httpTestingController: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([apiUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('debe agregar el dominio a la url de la peticion', () => {
    const url = '/mockendpoint';

    httpClient.get(url).subscribe();

    const req = httpTestingController.expectOne(`${environment.apiUrl}${url}`);
    expect(req.request.url).toEqual(`${environment.apiUrl}${url}`);
  });
});

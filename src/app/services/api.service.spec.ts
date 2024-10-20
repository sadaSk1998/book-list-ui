import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiService],
    });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getDetails and return data', () => {
    const endpoint = '/books';
    const mockResponse = { items: [{ id: '1', title: 'Test Book' }] };

    service.getDetails(endpoint).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${service['url']}${endpoint}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle errors from getDetails', () => {
    const endpoint = '/books';
    const errorMessage = '404 error';

    service.getDetails(endpoint).subscribe(
      (response) => fail('should have failed with 404 error'),
      (error) => {
        expect(error.status).toBe(404);
        expect(error.error).toContain(errorMessage);
      }
    );

    const req = httpMock.expectOne(`${service['url']}${endpoint}`);
    req.flush(errorMessage, { status: 404, statusText: 'Not Found' });
  });
});

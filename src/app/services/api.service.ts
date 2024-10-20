import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appEndpoints } from '../shared/constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url = appEndpoints.mainApiURL;
  constructor(private httpClient: HttpClient) {}
  getDetails(endpoint: string): Observable<any> {
    return this.httpClient.get(this.url + endpoint);
  }
}

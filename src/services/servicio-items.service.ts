import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServicioItemsService {

  private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.api;
  }

  public getServicioItem() {
    const fullUrl = `${this.baseUrl}${environment.urlItems}`;

    if (environment.production) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Accept': 'application/json'
        })
      };

      return this.http.get(`${fullUrl}`, httpOptions);
    } else {
      return this.http.get(fullUrl);
    }
  }
}

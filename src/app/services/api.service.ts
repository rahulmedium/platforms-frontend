import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  AUTHENTICATION_URL = environment.apiUrl + '/authenticate';

  constructor(private http: HttpClient) { }

  initLoginHeaders(email, password): HttpHeaders {
    const headers = new HttpHeaders()
      .set('X-Auth-Client', 'client1')
      .set('Authorization', "Basic " + btoa(email + ":" + password));
    return headers;
  }

  initAccessHeaders(email, password): HttpHeaders {
    const headers = new HttpHeaders()
      .set('X-Auth-Client', 'client1')
      .set('Authorization', "Bearer " + sessionStorage.getItem("accessToken"));
    return headers;
  }

  getAuthToken(email, password) {
    return this.http.post(this.AUTHENTICATION_URL, {}, { headers: this.initLoginHeaders(email, password) });
  }
}

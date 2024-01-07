import { environment } from 'src/environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, Register } from 'src/utils/data';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) {}

  public login(data: Login): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/login',
      data,
      { responseType: 'text' }
    );
  }

  public register(data: Register): Observable<string> {
    return this.http.post(
      environment.apiUrl + '/register',
      data,
      { responseType: 'text' }
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5005';

  constructor(private http: HttpClient) { }

  registerUser(userData: { name: string; email: string; password: string; dateOfBirth: Date }): Observable<HttpResponse<string>> {
    const headers = new HttpHeaders({
      'accept': '*/*',
      'Content-Type': 'application/json'
    });

    const payload = {
      name: userData.name,
      email: userData.email,
      dateOfBirth: userData.dateOfBirth.toISOString(),
      password: userData.password
    };

    return this.http.post(this.apiUrl+'/api/Auths/signup', payload, { headers, observe: 'response', responseType: 'text' });
  }

  loginUser(userData: { email: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({
       'Content-Type': 'application/json'
      }); 
    return this.http.post<any>(this.apiUrl+'/api/Auths/login', userData, { headers }); }
}

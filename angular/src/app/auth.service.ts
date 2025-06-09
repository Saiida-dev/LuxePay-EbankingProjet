import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://backend:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  verify(username: string, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/verify?username=${username}&code=${code}`, {});
  }

  sendOtp(numero: string): Observable<any> {
    return this.http.post('http://backend:8080/api/sms/otp', { numero });

  }
  login(credentials: { username: string, password: string }): Observable<any> {
  return this.http.post(`${this.apiUrl}/login`, credentials);
}

}

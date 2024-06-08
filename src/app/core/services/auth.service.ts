import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models';
import { ApiRoutes } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  signin(email: string, password: string) {
    const requestBody = { email, password };
    let params = new HttpParams();
    params = params.append('email', email);
    params = params.append('password', password);
    return this.http.post<{
      success: boolean;
      data: User;
      error?: string;
    }>(`${ApiRoutes.auth}Signin`, requestBody);
  }

  signup(username: string, email: string, password: string, role: string) {
    const requestBody = { username, email, password, role };
    return this.http.post<{
      success: boolean;
      data: User;
      error?: string;
    }>(`${ApiRoutes.auth}Signup`, requestBody);
  }

}

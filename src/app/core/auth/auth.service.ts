import { inject, Injectable } from '@angular/core';
import { SignInReq } from './models/sign-in-req.interface';
import { HttpClient } from '@angular/common/http';
import { SignInRes } from './models/sign-in-res.interface';
import { CONFIG } from '../config/config.provider';
import { SignUpReq } from './models/sign-up-req.interface';
import { tap } from 'rxjs';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private config = inject(CONFIG);
  private http = inject(HttpClient);

  public get token() {
    return this.getToken();
  }

  public isAuthenticated() {
    return this.token;
  }

  public login(data: Partial<SignInReq>) {
    return this.http
      .post<SignInRes>(`${this.config.apiUrl}/auth/login`, data)
      .pipe(tap((signInRes) => this.saveToken(signInRes)));
  }

  public register(data: Partial<SignUpReq>) {
    return this.http.post(`${this.config.apiUrl}/user/register`, data);
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
  }

  private saveToken(authResult: SignInRes) {
    localStorage.setItem(TOKEN_KEY, authResult.access_token);
  }

  private getToken() {
    localStorage.getItem(TOKEN_KEY);
  }
}

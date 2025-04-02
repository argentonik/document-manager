import { inject, Injectable } from '@angular/core';
import { SignInReq } from './models/sign-in-req.interface';
import { HttpClient } from '@angular/common/http';
import { SignInRes } from './models/sign-in-res.interface';
import { CONFIG } from '../config/config.provider';
import { SignUpReq } from './models/sign-up-req.interface';
import { asyncScheduler, scheduled, tap } from 'rxjs';
import { User } from './models/user.interface';

const TOKEN_KEY = 'auth_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private config = inject(CONFIG);
  private http = inject(HttpClient);

  private user: User | null = null;

  public isAuthenticated() {
    return !!this.getToken();
  }

  public getToken() {
    return localStorage.getItem(TOKEN_KEY);
  }

  public login(data: Partial<SignInReq>) {
    return this.http
      .post<SignInRes>(`${this.config.apiUrl}/auth/login`, data)
      .pipe(tap((signInRes) => this.saveToken(signInRes)));
  }

  public register(data: Partial<SignUpReq>) {
    return this.http.post(`${this.config.apiUrl}/user/register`, data);
  }

  public getCurrentUser() {
    if (this.user) {
      return scheduled([this.user], asyncScheduler);
    } else {
      return this.http.get<User>(`${this.config.apiUrl}/user`);
    }
  }

  public logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.user = null;
  }

  private saveToken(authResult: SignInRes) {
    localStorage.setItem(TOKEN_KEY, authResult.access_token);
  }
}

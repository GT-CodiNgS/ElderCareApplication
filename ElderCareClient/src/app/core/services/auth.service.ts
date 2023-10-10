import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginUser } from '../models/LoginUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://localhost:7177/login';
  constructor(private http: HttpClient) {}

  login(user: LoginUser) {
    return this.http.post(this.url, user);
  }
}

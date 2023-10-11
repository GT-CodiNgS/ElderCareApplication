import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/UserProfile';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = 'https://localhost:7177';
  constructor(private http: HttpClient) {}

  login(user: UserProfile) {
    return this.http.post(`${this.url}/login`, user);
  }

  register(user: UserProfile) {
    return this.http.post(`${this.url}/register`, user);
  }
}

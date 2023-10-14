import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/UserProfile';
import { SettingsService } from 'src/app/settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${this.config.baseUrl}/api/`;

  constructor(private config: SettingsService, private http: HttpClient) {}

  login(user: UserProfile) {
    console.log(this.apiUrl);

    return this.http.post(`${this.apiUrl}/login`, user);
  }

  register(user: UserProfile) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }
}

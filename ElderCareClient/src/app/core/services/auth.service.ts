import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserProfile } from '../models/UserProfile';
import { SettingsService } from 'src/app/settings.service';
import { environment } from '../../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.baseUrl;

  constructor(
    private config: SettingsService,
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  login(user: UserProfile) {
    console.log(this.apiUrl);

    return this.http.post(`${this.apiUrl}login`, user);
  }

  register(user: UserProfile) {
    return this.http.post(`${this.apiUrl}register`, user);
  }

  logout() {
    localStorage.clear();
    console.log('logout');
    this.router.navigate([''], { relativeTo: this.route });
  }
}

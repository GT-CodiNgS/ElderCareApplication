import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/settings.service';
import {environment} from "../../../environments/environment";
import {Post} from "../models/Post";

@Injectable({
  providedIn: 'root',
})
export class PostService implements OnInit {
  private apiUrl = environment.baseUrl + 'api/';

  constructor(private config: SettingsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Post`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Post/${id}`);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Post`, post);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Post/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}Post/${id}`);
  }
}

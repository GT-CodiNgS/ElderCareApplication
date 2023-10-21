import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SettingsService } from 'src/app/settings.service';
import { environment } from '../../../environments/environment';
import { Post } from '../models/Post';

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

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Post/admin`);
  }

  getPostById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}Post/${id}`);
  }

  addPost(post: Post): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}Post`, post);
  }

  updatePost(post: Post): Observable<any> {
    console.log(post);
    return this.http.put(`${this.apiUrl}Post`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}Post/${id}`);
  }

  verifyPost(id: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}Post/verify/${id}`, {});
  }

  getPostsByUserId(id: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}Post/user/${id}`);
  }
}

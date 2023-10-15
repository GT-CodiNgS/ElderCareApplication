import { Injectable } from '@angular/core';
import {UserUpdate} from "../models/UserUpdate";
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {PasswordReset} from "../models/PasswordReset";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = environment.baseUrl + 'users';

  constructor(private httpClient: HttpClient) { }

  updateUser(userDTO: UserUpdate): Observable<any> {
    return this.httpClient.put(this.url, userDTO)
  }

  getById(id: string):Promise<any>{
    console.log(id)
    return new Promise(((resolve, reject) => {
      this.httpClient.get(this.url, {
        params:new HttpParams().append("id", id)
      }).toPromise().then(res => {
        resolve(res)
      }, msg => {
        reject(msg)
      })
    }))
  }

  resetPassword(dto: PasswordReset): Observable<any> {
    return this.httpClient.put(this.url+'/reset', dto)
  }
}

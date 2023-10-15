import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public setItem(key: string, data: string): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  public getItem(key: string): string {
    return JSON?.parse(localStorage.getItem(key) as string);
  }

  public removeItem(key:any): void {
    localStorage.removeItem(key);
  }

  public clear() {
    localStorage.clear();
  }
}

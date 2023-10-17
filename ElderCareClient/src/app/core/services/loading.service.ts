import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public loading$ = new BehaviorSubject<boolean>(false);

  start() {
    this.loading$.next(true);
  }

  stop() {
    this.loading$.next(false);
  }
}

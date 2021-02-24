import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class ClientUserService {
  private _user$: BehaviorSubject<User> = new BehaviorSubject<User>(null)

  public get user$(): Observable<User> {
    return this._user$.asObservable();
  }

  public get user(): User {
    return this._user$.value;
  }

  public constructor() {
    this.setCurrentUserId('2');
  }

  public setCurrentUserId(userId: string) {
    this._user$.next({ id: userId });
  }

}

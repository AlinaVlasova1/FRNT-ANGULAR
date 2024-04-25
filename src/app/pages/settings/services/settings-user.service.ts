import { Injectable } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {delay, Observable, of, switchMap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {USERS} from "../../../shared/mocks/users";

export interface SettingsUsers{
  fio?: string,
  citizenship?: string,
  role?: string,
  birthData?: string
}
@Injectable({
  providedIn: 'root'
})
export class SettingsUserService {

  constructor(private userService: UserService) { }

  getUsers(): Observable<SettingsUsers[]>{
    const userArr: SettingsUsers[] = Array.isArray(USERS) ? [...USERS] : [];
    return of(userArr).pipe(
      withLatestFrom(this.userService.userBeSubject$),
      switchMap(([users, ownUser]) => {
        const newUser = {fio: ownUser?.login || ''};
        return of(users.concat([newUser]));
      }),
      map((arr) => arr.filter((el: SettingsUsers) => el.fio)),
      map((arr) => arr.concat(arr)),
      delay(200)
    )
  }
}

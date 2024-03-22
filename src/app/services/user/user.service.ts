import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  constructor() { }

  setUser(user: IUser){
    this.user = user;
  }
  getUser(): IUser{
    return this.user;
  }
}

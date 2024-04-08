import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser;
  private token: string;
  constructor() { }

  setUser(user: IUser){
    this.user = user;
  }
  getUser(): IUser{
    return this.user;
  }
  setToken(token: string): void{
    this.token = token;
  }
  getToken(): string{
    return this.token;
  }
}

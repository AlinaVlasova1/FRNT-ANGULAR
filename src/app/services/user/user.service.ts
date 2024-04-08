import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | undefined;
  private token: string | undefined;
  constructor() { }

  setUser(user: IUser){
    this.user = user;
  }
  getUser(): IUser | undefined {
    if(this.user){
      return this.user;
    } else {
      console.error("Error, undefined user");
      return
    }

  }
  setToken(token: string): void{
    this.token = token;
  }
  getToken(): string | undefined{
    if(this.token){
      return this.token;
    }else {
      console.error("Error, undefined token");
      return ;
    }

  }
  clearUserInfo(){
    this.user = undefined;
    this.token = undefined;
    console.log("Clear user info");
  }
}

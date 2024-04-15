import { Injectable } from '@angular/core';
import {IUser, TOKEN_STORE_NAME} from "../../models/users";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: IUser | undefined;
  private token: string | undefined;
  private userBeSubject = new BehaviorSubject<IUser | null>(null);
  readonly userBeSubject$ = this.userBeSubject.asObservable();
  constructor() { }

  setUser(user: IUser){
    if (user) {
      this.user = user;
      localStorage.setItem( 'user', JSON.stringify(user));
      this.userBeSubject.next(this.user);
    }
  }
  getUser(): IUser | undefined {
    const stringFromStore = localStorage.getItem('user');
    let userFromStore ;
    if (stringFromStore) {
      userFromStore = JSON.parse(stringFromStore);
    }
    const realuser = this.user || userFromStore;
    if(realuser){
      return realuser;
    } else {
      console.error("Error, undefined user");
      return
    }

  }
  setToken(token: string): void{
    this.token = token;
    localStorage.setItem(TOKEN_STORE_NAME, token);
  }
  getToken(): string | undefined {
    const tokenFromStore = localStorage.getItem(TOKEN_STORE_NAME);
    const  realToken = this.token || tokenFromStore;

    if (realToken) {
      return realToken;
    } else {
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

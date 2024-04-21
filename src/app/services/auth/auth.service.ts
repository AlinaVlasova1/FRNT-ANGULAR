import { Injectable } from '@angular/core';
import {IUser} from "../../models/users";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userStorage: IUser[] = [];
  constructor() {
    console.log('runn')
  }

  checkUser(user: IUser): boolean {
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    const isUserStorage: string = localStorage.getItem(`user${user.login}`)!;
    const isUser: IUser =JSON.parse(isUserStorage);
    if (isUser){
      return  isUser.password === user.password;
    }
    return false;
  }

  setUser(user: IUser): void{
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    if (!isUserExists && user?.login){
      this.userStorage.push(user);
    }
  }

  isUserExists(user: IUser): IUser | boolean {
    const isUserExists = this.userStorage.find((el) => el.login === user.login);
    return !!isUserExists;
  }


}

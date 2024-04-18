import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  login: string;
  password: string;
  passwordRepeat: string;
  email: string;
  cardNumber: string;
  selectedValue: boolean;
  saveUserInStore: boolean;
  showCardNumber: boolean;
  constructor(private messageService: MessageService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  registration(ev: Event): void | boolean{

    if (this.password != this.passwordRepeat){
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'})
      return false
    }

    const userObj: IUser = {
      password: this.password,
      cardNumber: this.cardNumber,
      login: this.login,
      email: this.email
    }
    if (!this.authService.isUserExists(userObj)){
      this.authService.setUser(userObj);
      this.messageService.add({severity: 'success', summary: 'Регистрация прошла успешно'})
      if (this.selectedValue){
        localStorage.setItem(`user${this.login}`, JSON.stringify(userObj));
      }
    } else {
      this.messageService.add({severity: 'warn', summary: 'Пользователь уже зарегестрирован'})
    }

  }

  StatusSelected(): void {
  }


}

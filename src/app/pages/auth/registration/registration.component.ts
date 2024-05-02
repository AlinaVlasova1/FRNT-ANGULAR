import { Component, OnInit } from '@angular/core';
import {MessageService} from "primeng/api";
import {IUser} from "../../../models/users";
import {AuthService} from "../../../services/auth/auth.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ServerError} from "../../../models/error";

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
  id: string;
  selectedValue: boolean;
  saveUserInStore: boolean;
  showCardNumber: boolean;
  constructor(private messageService: MessageService,
              private authService: AuthService,
              private http: HttpClient) { }

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
      email: this.email,
      id: this.id
    }

    this.http.post<IUser>('http://localhost:3000/users/', userObj).subscribe((data) => {
      if (this.saveUserInStore) {
        const objUserJsonStr = JSON.stringify(userObj);
        window.localStorage.setItem('user_'+userObj.login, objUserJsonStr);
      }
      this.messageService.add({severity:'success', summary:'Регистрация прошла успешно'});

    }, (err: HttpErrorResponse)=> {
      console.log("err", err);
      const serverError = <ServerError> err.error;
      this.messageService.add({severity:'warn', summary: serverError.errorText});
    });

  }

  StatusSelected(): void {
  }


}

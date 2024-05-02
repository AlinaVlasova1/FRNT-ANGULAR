import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {IUser} from "../../../models/users";
import {MessageService} from "primeng/api";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../services/user/user.service";
import {ConfigService} from "../../../services/config/config.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
})

export class AuthorizationComponent implements OnInit, OnDestroy {
  loginText = "Логин";
  passwordText = "Пароль";
  password: string;
  login: string;
  id: string;
  selectedValue: boolean;
  cardNumber: string;
  authTextButton: string;
  showCardNumber: boolean
  constructor(private authService: AuthService,
              private messageService: MessageService,
              private router: Router,
              private route: ActivatedRoute,
              private userService: UserService,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.authTextButton = "Авторизоваться";
    this.showCardNumber = ConfigService.config.useUserCard;
  }

  ngOnDestroy() {
    console.log("destroy")
  }

  vipStatusSelected(): void {
  }

  onAuth(ev: Event): void{
    const authUser: IUser = {
      password: this.password,
      login: this.login,
      cardNumber: this.cardNumber,
      id: this.id

    }
    this.http.post<{ access_token:string }>('http://localhost:3000/users/'+authUser.login, authUser).subscribe((data) => {

      this.userService.setUser(authUser);
      const token: string = 'user-private-token'+ data.access_token;
      this.userService.setToken(token);
     /* this.userService.setToStore(token);*/


      this.router.navigate(['tickets/tickets-list']);

    }, ()=> {
      this.messageService.add({severity:'warn', summary:"Ошибка"});
    });

  }

}

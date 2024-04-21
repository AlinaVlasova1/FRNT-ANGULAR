import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {Subject, Subscription, take, takeUntil} from "rxjs";
import {SettingsService} from "../../services/settings/settings.service";
import {AuthService} from "../../services/auth/auth.service";
import {UserService} from "../../services/user/user.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  newPsw: string;
  newRepeatPsw: string;
  currentPsw: string;
  subjectForUnsubscribe = new Subject();
  constructor(private obser: ObservableExampleService,
              private settingsService: SettingsService,
              private userService: UserService,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log("settings data", data);
    })
     this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data) => {
        console.log("settings data from subject", data);
      }
    )

  }

  ngOnDestroy() {
  this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }

  changePsw(ev: Event): void | boolean {
    const authPsw = this.userService.getUser();
    if (this.currentPsw != authPsw.password){
      this.messageService.add({severity: 'error', summary: 'Не правильно введен текущий пароль'})
      return false
    }
    else if (this.newPsw !== this.newRepeatPsw){
      this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'})
      return false
    }
    else {
      this.userService.setPsw(this.newPsw);
      this.messageService.add({severity: 'success', summary: 'Успешная смена пароля'})
    }

  }
}

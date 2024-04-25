import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../models/users";
import {UserService} from "../../../services/user/user.service";
import {MessageService} from "primeng/api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {createPasswordStrengthValidators} from "../validators/password";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  private user: IUser | null;

  constructor(private userService: UserService,
              private messageService: MessageService) { }

  changePasswordForm: FormGroup;

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.changePasswordForm = new FormGroup({
      currentPassword: new FormControl('', [Validators.required]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), createPasswordStrengthValidators()]),
      newPasswordRepeat: new FormControl('',[Validators.required, Validators.minLength(6), createPasswordStrengthValidators()] )
    })
  }
  onSubmitChangePassword(): void | boolean {
    console.log('click');
    const currentPsw = this.changePasswordForm.get("currentPassword")?.value;
    const newPsw = this.changePasswordForm.get("currentPassword")?.value;
    const repeatNewPsw = this.changePasswordForm.get("newPasswordRepeat")?.value;
    if (!this.user) {
      this.messageService.add({
        severity: "error",
        summary: "Ошибка обновления пароля",
        detail: "что-то не так"
      });
      return false;
    }
    if (this.user.password !== currentPsw) {
      this.messageService.add({
        severity: "error",
        summary: "Ошибка обновления пароля",
        detail: "Текущий пароль не верный"
      });
      return false;
    }
    if (newPsw !== repeatNewPsw) {
      console.log('Пароли не совпадают');
      this.messageService.add({
        severity: "error",
        summary: "Ошибка обновления пароля",
        detail: "Пароли не совпадают"
      });
      return false;
    }
    this.user.password = this.changePasswordForm.value.newPassword;
    this.userService.setUser(this.user);
    this.messageService.add({
      severity: "success",
      summary: "Пароль обнавлен"
    })

  }

}

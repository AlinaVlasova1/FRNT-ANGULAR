import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {HeaderComponent} from "../tickets/header/header.component";
import {TabViewModule} from "primeng/tabview";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {FormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    ToastModule
  ]
})
export class SettingsModule { }

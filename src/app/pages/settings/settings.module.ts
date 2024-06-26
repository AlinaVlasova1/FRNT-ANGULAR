import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';
import {HeaderComponent} from "../tickets/header/header.component";
import {TabViewModule} from "primeng/tabview";
import { ChangePasswordComponent } from './change-password/change-password.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MessagesModule} from "primeng/messages";
import {ToastModule} from "primeng/toast";
import { StatisticComponent } from './statistic/statistic.component';
import {TableModule} from "primeng/table";
import {FileUploadModule} from "primeng/fileupload";
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './pipes/filter.pipe';


@NgModule({
  declarations: [
    SettingsComponent,
    ChangePasswordComponent,
    StatisticComponent,
    UsersComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    TabViewModule,
    FormsModule,
    InputTextModule,
    MessagesModule,
    ToastModule,
    TableModule,
    ReactiveFormsModule,
    FileUploadModule
  ]
})
export class SettingsModule { }

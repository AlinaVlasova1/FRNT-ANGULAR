import { Component, OnInit } from '@angular/core';
import {SettingsUserService} from "../services/settings-user.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users: any[];
  searchValue: string;
  asynkUsers = this.userSettingsService.getUsers();
  constructor(private userSettingsService: SettingsUserService) { }

  ngOnInit(): void {
  }

}

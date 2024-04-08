import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ITour} from "../../models/tours";
import {Observable} from "rxjs";
import {UserService} from "../user/user.service";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getTickets(): Observable <ITour[]>{

    this.userService.setToken('user-private-token');
    const token = this.userService.getToken();

    const header = new Headers({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/',
      {headers: { 'Authorization': `Bearer ${token}` }});
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

}

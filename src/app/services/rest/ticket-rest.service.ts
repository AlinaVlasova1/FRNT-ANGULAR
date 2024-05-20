import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INearestTour, ITour, ITourClient, ITourLocation} from "../../models/tours";
import {Observable} from "rxjs";
import {UserService} from "../user/user.service";
import {IOrder} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient,
              private userService: UserService) { }

  getTickets(): Observable <ITour[]>{
    const token = this.userService.getToken();

    const header = new Headers({ 'Authorization': `Bearer ${token}` });
    const options = {
      headers: header,
    };
    return this.http.get<ITour[]>('http://localhost:3000/tours/',
      {headers: { 'Authorization': `Bearer ${token}` }});
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<ITour[]>{
    return this.http.get<ITour[]>('http://localhost:3000/tours/');
  }

  getLocationList(): Observable<ITourLocation[]>{
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/');
  }

  getRandomNearestEvent(type: number): Observable<INearestTour>{
    switch (type) {
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json');
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json');
      case 2:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json');
      default:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json');

    }
  }

  sendTourData(data: IOrder): Observable<IOrder>{
   return  this.http.post<IOrder>('http://localhost:3000/orders/', data);
  }

  getTicketById(id: string): Observable<ITour> {
    return this.http.get<ITour>(`http://localhost:3000/tours/${id}`);
  }

  createTour(body: any): Observable<any> {
    return this.http.post(`http://localhost:3000/tour-item/`, body)
  }

  getTicketByName(name: string): Observable<ITour[]> {
    return this.http.get<ITour[]>(`http://localhost:3000/tour-item/${name}`);
  }
}

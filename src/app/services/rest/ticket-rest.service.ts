import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {INearestTour, ITour, ITourLocation} from "../../models/tours";
import {Observable} from "rxjs";
import {UserService} from "../user/user.service";

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

  getNearestTickets(): Observable<INearestTour[]>{
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/');
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

  sendTourData(data: any): Observable<any>{
   return  this.http.post('/assets/mocks/nearestTours2.json', data);
  }

  getTicketById(id: string){
    return this.http.get(`http://localhost:3000/tours/${id}`);
  }
}

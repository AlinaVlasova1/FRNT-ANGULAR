import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {Observable, Subject} from "rxjs";
import {ITour, ITourTypeSelect} from "../../models/tours";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  obs = new Observable()
  private ticketSubject = new Subject<ITourTypeSelect>()

// 1 вариант доступа к Observable
  readonly ticketType$ = this.ticketSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService) { }

  getTickets(): Observable<ITour[]>{
    return this.ticketServiceRest.getTickets().pipe(map(
      (value) => {
        const singleTours = value.filter((el) => el.type === 'single');
        return value.concat(singleTours);
      }
    ));
  }

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type:ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }
}

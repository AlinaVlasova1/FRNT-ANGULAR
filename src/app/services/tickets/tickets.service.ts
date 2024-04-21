import { Injectable } from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {
  combineLatest,
  combineLatestAll,
  delay,
  find,
  forkJoin,
  Observable,
  of,
  Subject,
  switchMap,
  takeUntil, tap,
  timeout
} from "rxjs";
import {INearestTour, INewNearestTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TicketsService {
  obs = new Observable()
  private ticketSubject = new Subject<ITourTypeSelect>()
   nearestTour: INearestTour[] ;
  tourLocation: ITourLocation[] ;
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

  getError(): Observable<any> {
    return this.ticketServiceRest.getRestError();
  }

  getNearestTickets(): Observable<INearestTour[]>{
    return  this.ticketServiceRest.getNearestTickets();
  }

  getLocationList(): Observable<ITourLocation[]>{
   return  this.ticketServiceRest.getLocationList()
  }

  getNewNearstTours(): Observable<INewNearestTour[]>  {
     return forkJoin([this.getNearestTickets(), this.getLocationList()]).pipe(

       switchMap(([nearestTour, tourLocation]) => {
           const newArr: INewNearestTour[] = nearestTour.map((el) => {
           const location = tourLocation.find((loc) => loc.id === el.locationId);

           return <INewNearestTour>{...el, ...{tourLocation: location.name}}
       });

      return of(newArr)
      })
  );

}

}

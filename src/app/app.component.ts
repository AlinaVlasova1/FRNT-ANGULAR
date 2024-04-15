import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";
import {ConfigService} from "./services/config/config.service";
import {concatMap, delay, exhaustMap, filter, fromEvent, mergeMap, of, switchMap, tap, withLatestFrom} from "rxjs";
import {map} from "rxjs/operators";
import {UserService} from "./services/user/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  prop: string;
  constructor(private testing: ObservableExampleService,
              private configService: ConfigService,
              private userService: UserService) {
  }
  ngOnInit() {
    /*const cliclEv = fromEvent<MouseEvent>(document, 'click');
    cliclEv.pipe(
      tap((data) => {
        console.log("tab data" ,data);
      }),
      filter((el) => {
        return (el.target as HTMLElement).nodeName === "INPUT"
      }),
      map((data) => {
        return data.clientX;
      }),*/
      /*switchMap((data) => {
        return of(data).pipe(delay(2000))
      }),*/
      /*mergeMap((data) =>{
        return of(data).pipe(delay(2000))
        }
      )*/
     /* concatMap((data) => {
        return of(data).pipe(delay(2000))
      })*/
     /* exhaustMap((data) => {
        return of(data).pipe(delay(2000));
      })*/
     /* withLatestFrom(this.userService.userBeSubject$),
      switchMap(([clientX, user ]) => {
        return of ({clientX, user}).pipe(delay(2000))
      })
    ).subscribe((data) => {
      console.log("data from subscribe" ,data);
    })*/
    const myObservable = this.testing.getObservable();
   /* myObservable.subscribe((data) => {
      /!*console.log('first myObservable data', data);*!/
    })

    myObservable.subscribe((data) => {
      /!*console.log('second myObservable data', data);*!/
    })*/

    const mySubject = this.testing.getSubject();

   /* mySubject.subscribe((data) => {
      /!*console.log('first mySubject data', data);*!/
    })
    mySubject.subscribe((data) => {
      /!*console.log('second mySubject data', data);*!/
    })*/
    /*mySubject.next('subject value');*/
   /* mySubject.next('subject value');*/

    const myBehavior = this.testing.getBehaviorSubject();
/*
    myBehavior.subscribe((data) => {
      console.log('first myBehavior data', data);
    })
    myBehavior.next('new data from BehaviorSubject');
    myBehavior.next('new data1 from BehaviorSubject');*/
    /*this.configService.configLoad();*/
  }


}

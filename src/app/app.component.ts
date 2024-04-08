import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./services/testing/observable-example.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ticketSales2022';
  prop: string;
  constructor(private testing: ObservableExampleService) {
  }
  ngOnInit() {
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
  }
}

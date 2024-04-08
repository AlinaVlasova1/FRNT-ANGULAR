import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObservableExampleService {

  private myBehaviourSubject = new BehaviorSubject<string>('some data of Behavior Subject');
  private mySubject = new Subject<string>();
  private myObservable = new Observable<string>((subscriber) => {
    subscriber.next('synk someValue');
    setTimeout(() => {
      subscriber.next('someValue');
    }, 3000)
  })
  constructor() { }

  initObservable(): void{
    const observable = new Observable((subscriber => {
      subscriber.next(4);
      subscriber.next(5);
      setTimeout(() => {
        subscriber.next('asyncData');
        subscriber.error('some err hear');
      }, 3000)
    }))

    observable.subscribe((data) => {
      console.log('observable data', data);
    },(error => {
      console.log('error', error)
    }))
  }

  getObservable(): Observable<string>{
    return this.myObservable;
  }

  getSubject(): Subject<string>{
    return this.mySubject;
  }

  getBehaviorSubject(): BehaviorSubject<string>{
    return this.myBehaviourSubject;
  }
}

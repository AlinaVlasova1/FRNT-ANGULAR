import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subjectScope: Subject<string> ;
  private subjectUnsubscribe: Subscription ;

  constructor(private obser: ObservableExampleService) { }

  ngOnInit(): void {
    this.subjectScope =  this.obser.getSubject();
    const myObservable = this.obser.getObservable();
    const unsubscribe =  myObservable.subscribe((data) => {
      console.log(' myObservable data', data);
    })
    unsubscribe.unsubscribe();
    this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
      console.log('data', data)
    })
    this.subjectScope.next("data subjectScope");
  }

  ngOnDestroy() {
    this.subjectUnsubscribe.unsubscribe();
  }

}

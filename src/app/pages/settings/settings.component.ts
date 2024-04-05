import {Component, OnDestroy, OnInit} from '@angular/core';
import {ObservableExampleService} from "../../services/testing/observable-example.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subjectScope = this.obser.getSubject();
  private subjectUnsubscribe: Subscription ;

  constructor(private obser: ObservableExampleService) { }

  ngOnInit(): void {
    this.subjectScope.subscribe((data) => {
      console.log(data);
    })
    this.subjectScope.next("data subjectScope");
    this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
      console.log('data', data)
    })
  }

  ngOnDestroy() {
    this.subjectUnsubscribe .unsubscribe();
  }

}

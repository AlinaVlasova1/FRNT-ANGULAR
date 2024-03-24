import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ITour} from "../../../models/tours";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit/*, OnChanges */{
  @Output() tourEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  nameTour(value: string){
    this.tourEvent.emit(value);
  }

  /*ngOnChanges(changes: SimpleChanges) {
    for (let name in changes) {
      let tourName = changes[name];
      this.tourEvent  = JSON.stringify(tourName.currentValue);
      }
    /!*if( ev.length >= 3){
      this.tourEvent = ev;
      console.log(ev);
    }*!/
  }*/

  onKey(ev: any): void{
    if( ev.length >= 3){
      this.tourEvent = ev;
      console.log(ev);
    }

  }
  getName(ev: string){
    this.tourEvent.emit(ev);
  }

}

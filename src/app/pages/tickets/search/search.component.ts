import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ITour} from "../../../models/tours";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() tourEvent = new EventEmitter<string>();
  @Input() tourName: string;
  constructor() { }

  ngOnInit(): void {
  }

  nameTour(value: string){
    this.tourEvent.emit(value);
  }
}

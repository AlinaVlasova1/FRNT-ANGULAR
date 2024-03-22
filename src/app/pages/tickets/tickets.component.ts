import { Component, OnInit } from '@angular/core';
import {IMenuType} from "../../models/menuType";
import {ITour} from "../../models/tours";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  selectedType: IMenuType;

  constructor() { }

  ngOnInit(): void {
  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}

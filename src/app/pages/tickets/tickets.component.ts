import { Component, OnInit } from '@angular/core';
import {IMenuType} from "../../models/menuType";
import {ITour, ITourTypeSelect} from "../../models/tours";
import {Subscription} from "rxjs";
import {TicketsService} from "../../services/tickets/tickets.service";

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

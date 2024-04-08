import {Component, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../models/menuType";
import {ITour, ITourTypeSelect} from "../../models/tours";
import {filter, Subscription} from "rxjs";
import {TicketsService} from "../../services/tickets/tickets.service";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationStart,
  NavigationEnd,
  NavigationStart,
  Router
} from "@angular/router";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
  @Output() public selectedType: IMenuType;

  constructor(private router: Router, private route: ActivatedRoute) { }
  showAside: boolean = true;
  ngOnInit(): void {

    console.log('activated route data', this.route)

    this.router.events.pipe(
      filter((ev) => ev instanceof ActivationStart)
    ).subscribe((data) => {
      if (data instanceof ActivationStart) {
        let routeData = data.snapshot.data;
        console.log('router Data', routeData)
        this.showAside = !(routeData as any)?.asideHidden;
      }
    })
  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}

import {Component, OnDestroy, OnInit, Output} from '@angular/core';
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
import {UserService} from "../../services/user/user.service";

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, OnDestroy {
  @Output() public selectedType: IMenuType;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private  userService: UserService) { }
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
  ngOnDestroy() {
    this.userService.clearUserInfo();
  }

  updateSelectedType(ev: IMenuType): void {
    this.selectedType = ev;
  }


}

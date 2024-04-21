import {AfterViewInit, Component, OnInit} from '@angular/core';
import {INearestTour, INewNearestTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {concat, forkJoin, map} from "rxjs";

@Component({
  selector: 'app-ticket-item',
  templateUrl: 'ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {

  ticket: ITour | undefined;
  user: IUser | undefined;
  userForm: FormGroup;
  nearstTours: INearestTour[] = [];
  toursLocation: ITourLocation[];
  newNearstTours: INewNearestTour[];

  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService,
              private ticketService: TicketsService) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.userForm = new FormGroup<any>({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(''),
      birthDay: new FormControl(''),
      age: new FormControl(''),
      citizen: new FormControl('')
    })

    // forkJoin([this.ticketService.getNearestTickets(), this.ticketService.getLocationList()]).subscribe((data) => {
    //   console.log("data", data);
    //   this.nearstTours = data[0];
    //   this.toursLocation = data[1];
    // })

    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId){
      const ticketStorage = this.ticketStorage.getStorage();
      if (Array.isArray(ticketStorage)) {
        this.ticket = ticketStorage.find((el) => el.id === paramValueId);
        console.log("this.ticket", this.ticket);
      }
    }

    this.ticketService.getNewNearstTours().subscribe((data) => {
      console.log('xxx', data)
         this.newNearstTours = data
      });


  }
  ngAfterViewInit() {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
  }
  onSubmit(){

  }

  selectDate(ev:Event){

  }

/*  transforNearestTickets(): any {
    forkJoin([this.ticketService.getNearestTickets(), this.ticketService.getLocationList()]).subscribe((data) => {
        console.log("data", data);
        const tours = []
        for (let i = 0; i < data[0].length; i++) {
          for (let j = 0; j < data[1].length; j++) {
            if (data[0][i].locationId === data[1][j].id) {
              const objTour: any = data[0][i];
              objTour.tourLocation = data[1][j].name;
              tours.push(objTour);
            }
          }
        }
        return tours;
      }
      );
    }*/
}


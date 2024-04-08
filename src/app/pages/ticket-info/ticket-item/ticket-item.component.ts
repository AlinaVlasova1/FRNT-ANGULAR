import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ITour} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user/user.service";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit {

  ticket: ITour | undefined;
  user: IUser;
  userForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private ticketStorage: TiсketsStorageService,
              private userService: UserService) { }

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
    const routeIdParam = this.route.snapshot.paramMap.get('id');
    const queryIdParam = this.route.snapshot.queryParamMap.get('id');
    const paramValueId = routeIdParam || queryIdParam;
    if (paramValueId){
      const ticketStorage = this.ticketStorage.getStorage();
      this.ticket = ticketStorage.find((el) => el.id === paramValueId);
      console.log("this.ticket", this.ticket);
    }
  }
  ngAfterViewInit() {
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber);
  }
  onSubmit(){

  }

  selectDate(ev:Event){

  }
}

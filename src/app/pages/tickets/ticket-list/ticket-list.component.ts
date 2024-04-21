import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {debounceTime, firstValueFrom, fromEvent, Observable, of, Subscription} from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {

  tickets: ITour[] = [];
  ticketsCopy: ITour[];
  findTour: ITour | undefined;
  finallyComplete: boolean = false;
  itemsChanges: boolean;
  private tourUnsubscriber: Subscription;
  ticketsSub = this.ticketService.getTickets();
  searchvalue: string;
  @ViewChild('ticketSearch') ticketSearch: ElementRef;
  searchTicketSub: Subscription;
  ticketSearchValue: string;

  constructor(private ticketService: TicketsService,
              private ticketStorage: TiсketsStorageService,
              private router: Router) {


  }
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective;
  @ViewChild('tourWrap') tourWrap: ElementRef;
 /* @ViewChild(BlocksStyleDirective) blocksDirective1: BlocksStyleDirective;*/

  ngOnInit(): void {
     this.ticketService.getTickets().subscribe(
       (data: ITour[]) => {
         if (Array.isArray(data)) {
           this.tickets = data
           this.ticketsCopy = data;
           this.ticketStorage.setStorage(data);
           this.finallyComplete = true;
         }
      }, (err) => {
         console.log('err', err)
       }
    );
    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data:ITourTypeSelect) => {
      console.log('data', data);

      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;

      }

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue',dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }
      setTimeout(() => {

        this.blockDirective.updateItems();

        this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
      });
    });
  }

  ngAfterViewInit(){
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe((ev: any) => {
        if (this.ticketSearchValue) {
          this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(this.ticketSearchValue.toLowerCase()));
        } else {
          this.tickets = [...this.ticketsCopy];
        }
      });
  }
  ngOnDestroy() {
    if (this.tourUnsubscriber) {
      this.tourUnsubscriber.unsubscribe();
    }
    this.searchTicketSub.unsubscribe();

  }
 /* startRender(ev: string){
    this.blockDirective.renderBorder();
  }
*/
  searchTour(tourName: string): void{
    // this.findTour = this.tickets.find((t) => t.name === tour);
    //
    // return <ITour>this.findTour;
    const strLength = tourName.length;
    const lastIndex = strLength - 1;
    const searchNameTour = new RegExp(tourName, "ig");
    if ((tourName === "") || (strLength <= 2) ) {
      this.tickets = [...this.ticketsCopy];
    } else {

      this.tickets = this.ticketsCopy.filter((el) => el.name.toLowerCase().includes(tourName.toLowerCase()));
    }

    this.startRender()

  }

  hiddenTour(tour: ITour): string{
     if(tour === this.findTour || !this.findTour){
       return "inline-block";
     } else{
       return "none";
     }
  }

  goToTicketInfoPage(item: ITour){
    this.router.navigate([`/tickets/ticket/${item.id}`]);
  }

  startRender(){
    if (this.finallyComplete){
      this.blockDirective.renderBorder();
    }
  }
  onEnter(ev: {index: number}): void {
    const tour = this.tickets[ev.index];
    this.goToTicketInfoPage(tour);
  }
  directiveRenderComplete(ev: boolean){
    this.blockDirective.initStyle(0);
    const element: HTMLElement = this.tourWrap.nativeElement;
    element.setAttribute('style', 'background-color: #f1fff1')
  }



}

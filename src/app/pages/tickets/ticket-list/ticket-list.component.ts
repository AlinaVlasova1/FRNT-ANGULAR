import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour} from "../../../models/tours";
import {TiсketsStorageService} from "../../../services/tiсkets-storage/tiсkets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {firstValueFrom, Observable, of} from "rxjs";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, AfterViewInit {
  tickets: ITour[] ;
  ticketsCopy: ITour[];
  findTour: ITour | undefined;
  finallyComplete: boolean = false;
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
        this.tickets = data
        this.ticketsCopy = data;
        this.ticketStorage.setStorage(data);
        this.finallyComplete = true;
      }
    );
  }
  ngAfterViewInit(){

  }

 /* startRender(ev: string){
    this.blockDirective.renderBorder();
  }
*/
  searchTour(tourName: string): void{
    // this.findTour = this.tickets.find((t) => t.name === tour);
    //
    // return <ITour>this.findTour;
    const str = tourName.length;

    if ((tourName === "") || (str <= 2) ) {
      this.tickets = [...this.ticketsCopy];
    } else {

      this.tickets = this.ticketsCopy.filter((el) => el.name.substring(0,str ).toLowerCase() === tourName);
    }

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

  startRender(ev:string){
    if (this.finallyComplete){
      this.blockDirective.renderBorder();
    }
  }

  directiveRenderComplete(ev: boolean){
    this.blockDirective.initStyle(3);
    const element: HTMLElement = this.tourWrap.nativeElement;
    element.setAttribute('style', 'background-color: #f1fff1')
  }
}

import {Component, OnInit} from '@angular/core';
import {TicketsService} from "../../../services/tickets/tickets.service";
import {ITour} from "../../../models/tours";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {
  tickets: ITour[] = [];
  ticketsCopy: ITour[];
  findTour: ITour | undefined;
  constructor(private ticketService: TicketsService) {


  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data || [];
        this.ticketsCopy = [...this.tickets];
      }
    );
  }

  searchTour(tourName: string): void{
    // this.findTour = this.tickets.find((t) => t.name === tour);
    //
    // return <ITour>this.findTour;

    if (tourName === "" || tourName.length < 3 ) {
      this.tickets = [...this.ticketsCopy];
    } else {
      this.tickets = this.ticketsCopy.filter((el) => el.name.substring(1,tourName.length ) === tourName);
    }

  }

  hiddenTour(tour: ITour): string{
     if(tour === this.findTour || !this.findTour){
       return "inline-block";
     } else{
       return "none";
     }
  }
}

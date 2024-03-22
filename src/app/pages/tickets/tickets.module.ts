import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsaideComponent } from './asaide/asaide.component';
import {MenubarModule} from "primeng/menubar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsaideComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    ButtonModule
  ]
})
export class TicketsModule { }

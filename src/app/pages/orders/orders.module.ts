import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import {TreeTableModule} from "primeng/treetable";
import {CheckboxModule} from "primeng/checkbox";
import {OrderHeadersComponent} from "./order header/order-headers.component";
import {TableModule} from "primeng/table";



@NgModule({
  declarations: [
    OrdersComponent,
    OrderHeadersComponent
  ],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        TreeTableModule,
        CheckboxModule,
        TableModule
    ]
})
export class OrdersModule { }

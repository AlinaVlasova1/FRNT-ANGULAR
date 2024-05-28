import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../../services/order/order.service";

@Component({
  selector: 'app-order-headers',
  templateUrl: './order-headers.component.html',
  styleUrls: ['./order-headers.component.scss']
})
export class OrderHeadersComponent implements OnInit {

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
  }

  groupOrders(ev: {checked: boolean}): void {
    this.orderService.initGroupOrders(ev.checked);
  }


}

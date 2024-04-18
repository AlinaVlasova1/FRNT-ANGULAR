import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {TreeNode} from "primeng/api";
import {OrderType} from "../../shared/mocks/orfders";
import {OrderService} from "../../services/order/order.service";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  tableData$: Observable<TreeNode<OrderType[]>[]>;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.initOrders();

    this.orderService.groupOrders$.subscribe((data) => {
      this.initOrders();
    })
  }

  initOrders(): void{
    this.tableData$ = this.orderService.getOrders();
  }
}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {TreeNode} from "primeng/api";
import {OrderType} from "../../shared/mocks/orfders";
import {OrderService} from "../../services/order/order.service";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy{
  tableData$: Observable<TreeNode<OrderType[]>[]>;
  private _destroyer: Subscription;


  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.initOrders();

    this._destroyer = this.orderService.groupOrders$.subscribe((data) => {
      this.initOrders();
    })
  }

  ngOnDestroy(): void {
    this._destroyer.unsubscribe();
  }

  initOrders(): void{
    this.tableData$ = this.orderService.getOrders();
  }
}

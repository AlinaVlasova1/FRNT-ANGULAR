import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subscription, switchMap, withLatestFrom} from "rxjs";
import {TreeNode} from "primeng/api";
import {OrderType} from "../../shared/mocks/orfders";
import {OrderService} from "../../services/order/order.service";
import {IOrder, IOrdersAndTours} from "../../models/order";
import {ITour} from "../../models/tours";
import {TicketsService} from "../../services/tickets/tickets.service";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy{
  tableData$:  Observable<IOrder[]>;
  tours: Observable<IOrdersAndTours>;
  toursOrder: ITour[];
  orders:IOrder[];
  userId: string;
  toursTransform: Observable<TreeNode<OrderType[]>[]>;
  /*private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();*/
  private _destroyer: Subscription;


  constructor(private orderService: OrderService,
              private tourService: TicketsService) { }

  ngOnInit(): void {
    this.initOrders();

    this._destroyer = this.orderService.groupOrders$.subscribe((data) => {
      this.initOrders();
    })
  }

  ngOnDestroy(): void {
    /*this._destroyer.unsubscribe();*/
  }

  initOrders(): void{
    const userFromStorage = localStorage.getItem('user');
    this.userId = JSON.parse(userFromStorage).id;
    this.tableData$ = this.orderService.getOrders().pipe(
     map((array) => {
       return   array.filter((el) => el.userId == this.userId )
      }),
      map((array) => {
        array.forEach((el) =>
          el.birthDay = new Date(el.birthDay)
            .toLocaleString('ru-RU',
              {year:"numeric", month:"short", day:  "numeric"}))
      return array})
    );
    this.tours = forkJoin([this.tableData$,this.tourService.getTours()]).pipe(
        switchMap(([orders, tours ]) => {
          const toursTrue: IOrdersAndTours = [];
          orders.filter((order) => {
            for (let i = 0; i < tours.length; i++) {
              if (order.tourId == tours[i]._id) {
                toursTrue.push({...tours[i], ...order});
              }
            }
          })
          return of(toursTrue);
      })
    )
    this.toursTransform = this.tours.pipe(
      withLatestFrom(this.orderService.groupOrders$),
      switchMap(([orders, group]) => {
        console.log("group", group)
        return of(orders).pipe(
          map((data) => {
            if (group) {
              return [this.orderService.groupData(data , 'name')];
            } else {
              return [this.orderService.transformOrderData(data)];
            }

          }));
      })
    )



    console.log("this.toursOrder",this.toursOrder );


    /*console.log("this.tableData$",this.tableData$ );*/

    /*this.tours = this.tourService.getTours();*/
    /*if ((this.orders != null) && (this.tours != null)) {
      this.tableData$ = [...[this.tours]!, ...[this.orders]!];
    }*/

  }
}

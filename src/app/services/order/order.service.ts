import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap, withLatestFrom} from "rxjs";
import {ORDERSMOCK, OrderType} from "../../shared/mocks/orfders";
import {TreeNode} from "primeng/api";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();
  constructor() { }


  transformOrderData(data: OrderType[]): TreeNode<OrderType[]>{
    const treeNodeObj: TreeNode = {
      children: [],
      data: {
        name: 'Заказы',
      },
      expanded: true
    }
    if (Array.isArray(data)) {
      data.forEach((el) => {
        const dataObj = {
          data: el
        }
        treeNodeObj.children?.push(dataObj);
      });
    } else {
      return  <TreeNode<OrderType[]>>[];
    }
    console.log("treeNodeObj", treeNodeObj);
    return treeNodeObj;
  }

  getOrders():Observable<TreeNode<OrderType[]>[]>{
    return of(ORDERSMOCK).pipe(
      withLatestFrom(this.groupOrders$),
      switchMap(([orders, group]) => {
        console.log("group", group)
        return of(orders).pipe(
          map((data) => {
            return [this.transformOrderData(data)]
          })
        )
      })
    )
  }

  initGroupOrders(val: boolean): void {
    this.groupOrders.next(val);
  }
}

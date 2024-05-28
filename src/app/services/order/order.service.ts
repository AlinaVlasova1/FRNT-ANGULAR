import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of, switchMap, withLatestFrom} from "rxjs";
import {ORDERSMOCK, OrdersPropsType, OrderType} from "../../shared/mocks/orfders";
import {TreeNode} from "primeng/api";
import {map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {IOrder} from "../../models/order";
import {ITour} from "../../models/tours";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private groupOrders = new BehaviorSubject(false);
  readonly groupOrders$ = this.groupOrders.asObservable();
  constructor(private http: HttpClient) { }


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

  getOrders():Observable<IOrder[]>{
    return this.http.get<IOrder[]>(`http://localhost:3000/orders/`);
    /*return of(ORDERSMOCK).pipe(
      withLatestFrom(this.groupOrders$),
      switchMap(([orders, group]) => {
        console.log("group", group)
        return of(orders).pipe(
          map((data) => {
            if (group) {
              return [this.groupData(data , 'name')];
            } else {
              return [this.transformOrderData(data)];
            }

          }));
      })
    )*/
  }

  initGroupOrders(val: boolean): void {
    this.groupOrders.next(val);
  }

  groupData(data: OrderType[], prop: OrdersPropsType): TreeNode<OrderType[]>{
    const treeNodeObj: TreeNode = {
      children: [],
      data: {
        name: 'Заказы',
      },
      expanded: true
    }
    if (Array.isArray(data)) {
      data.reduce((acc: TreeNode<any>, el, index) => {
        const targetItem = acc.children.find((treeEl) => treeEl.data[prop] === el[prop])
        if (targetItem) {
          const newTreeNode: TreeNode = {
            data: el,
            expanded: false
          }
          targetItem.children.push(newTreeNode);
          } else {
          const newTreeNode: TreeNode = {
            data: el,
            expanded: false,
            children: []
          }
          acc.children.push(newTreeNode);
        }
        return treeNodeObj;
      }, treeNodeObj);
      console.log('treeNodeObj', treeNodeObj);
      return treeNodeObj;
    } else  {
      return <TreeNode<OrderType[]>>[];
    }
  }
}

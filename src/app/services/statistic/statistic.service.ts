import { Injectable } from '@angular/core';
import {StatisticRestService} from "../rest/statistic-rest/statistic-rest.service";
import {Observable} from "rxjs";
import {ICustomStatisticUser} from "../../models/users";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class StatisticService {

  constructor(private statisticRestService: StatisticRestService) { }
  getUserStatic(): Observable<ICustomStatisticUser[]>{
    return this.statisticRestService.getUserStatic().pipe(
      map((data) => {
        const newDataArr:  ICustomStatisticUser[] = [];
        data.forEach((el) => {
          const newDataObj: ICustomStatisticUser = {
            id: el.id,
            name: el.name,
            city: el.address.city,
            company: el.company.name,
            phone: el.phone,
            street: el.address.street
          };
          newDataArr.push(newDataObj)
          })
        return newDataArr;
        })
    )}
}

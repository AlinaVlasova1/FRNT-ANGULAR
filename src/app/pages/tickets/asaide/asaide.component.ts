import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";

@Component({
  selector: 'app-asaide',
  templateUrl: './asaide.component.html',
  styleUrls: ['./asaide.component.scss']
})
export class AsaideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
    this.menuTypes = [
      {type: 'custom', label : 'Обычное'},
      {type: 'extended', label : 'Расширенное'}
    ]
  }

  changeType(ev: {ev: Event, value: IMenuType}): void {
    console.log('ev', ev);
    this.updateMenuType.emit(ev.value);
  }

}

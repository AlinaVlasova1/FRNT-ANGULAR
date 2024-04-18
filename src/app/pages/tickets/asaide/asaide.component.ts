import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from "../../../models/menuType";
import {ITourTypeSelect} from "../../../models/tours";
import {TicketsService} from "../../../services/tickets/tickets.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../services/settings/settings.service";

@Component({
  selector: 'app-asaide',
  templateUrl: './asaide.component.html',
  styleUrls: ['./asaide.component.scss']
})
export class AsaideComponent implements OnInit {
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType;
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter();
  constructor(private ticketService: TicketsService,
              private messageService: MessageService,
              private settingsService: SettingsService) { }

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

  changeTourType(ev:  {ev: Event, value: ITourTypeSelect}): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date:ev})
  }

  initRestError(ev: Event): void {
    this.ticketService.getError().subscribe({
      next:(data)=> {

      },
      error: (err) => {
        console.log('err', err)
      }
    });
    this.messageService.add({severity: 'error', summary: 'Ошибка при запросе на сервер'});
  }

  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    });





  }

}

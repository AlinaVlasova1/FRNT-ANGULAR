import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]',
  host: {
    '(document:keyup)': "initKeyup($event)"
  },
  exportAs: 'blocksStyle'
})
export class BlocksStyleDirective implements OnInit, OnChanges{
  @Input() selector: string;
  @Input() initFirst : boolean = false;
  @Input() complete: boolean = false;
  @Output() renderComplete = new EventEmitter();
  @Output() start = new EventEmitter();
  private startRender: boolean;

  private items: HTMLElement[];
  private index: number = 0;
  public activeElementIndex: number;
  $event: KeyboardEvent;

  constructor(private el: ElementRef) { }

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges) {
    this.start.emit(true);
  }

  renderBorder(){

    setTimeout(() => {
      this.activeElementIndex = 0;
      if (this.complete){
        if (this.selector){
          this.items = this.el.nativeElement.querySelectorAll(this.selector);
          if (this.initFirst){
            if (this.items[this.index]){
              (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
            }
          }
        } else{
          console.error('Не передан селектор');
        }
        setTimeout(() => {
          this.renderComplete.emit(true);
        })

      }


    })

  }

  initKeyup(ev: KeyboardEvent): void{
    console.log("this.index", this.index);
    console.log("this.items", this.items);
    console.log('ev', ev);
    if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft'){
      this.items[this.index].removeAttribute('style');
    }


    if (ev.key === 'ArrowRight'){
      this.index++;
      if (this.items[this.index]){
        (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
      }
    } else if (ev.key === 'ArrowLeft'){
      this.index--;
      if (this.items[this.index]){
        this.items[this.index].setAttribute('style', 'border: 2px solid red');
      }
    }
    this.activeElementIndex = this.index;
  }

  initStyle(index: number){
    if (this.items[index]){
      this.items[this.index].removeAttribute('style');
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }

}

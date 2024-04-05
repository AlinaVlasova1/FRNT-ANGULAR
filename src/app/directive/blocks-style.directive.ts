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
  @Output() onEnter = new EventEmitter();
  private startRender: boolean;

  private items: HTMLElement[];
  private index: number;
  @Input() itemsChanges: boolean = false;
  public activeElementIndex: number;
  $event: KeyboardEvent;

  constructor(private el: ElementRef) { }

  ngOnInit(){

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes)
    if (changes['complete']?.currentValue) {
      this.renderBorder();
    }
    if (changes['itemsChanges']?.currentValue) {
      this.renderBorder();
    }

  }

  renderBorder(){
  console.log('run')
    setTimeout(() => {
      this.activeElementIndex = 0;
      if (this.complete){
        if (this.selector){
          this.items = this.el.nativeElement.querySelectorAll(this.selector);
          console.log('this.items', this.items.length)
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


    }, 1000)

  }

  initKeyup(ev: KeyboardEvent): void{
    console.log("this.index", this.index);
    console.log("this.items", this.items);
    console.log('ev', ev);
    if ( this.index >= 35 ){
      const const1 = 35;
      this.index = const1;
      this.activeElementIndex = const1;
    }
    else if ((this.index-1)  <= (-1)){
      const const2 = 0
      this.index = const2;
      this.activeElementIndex = const2;
    }

      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft'){
        this.items[this.index].removeAttribute('style');
      }

      if (ev.key === 'ArrowRight'){
        if (this.index >= 35){
          const const1 = 35;
          this.index = const1;
          this.activeElementIndex = const1;
        }else{
          this.index++;
        }
        if (this.items[this.index]){
          (this.items[this.index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
        }
      } else if (ev.key === 'ArrowLeft'){
        if ((this.index-1)  <= (-1)){
          const const2 = 0
          this.index = const2;
          this.activeElementIndex = const2;
        } else{
          this.index--;
        }

        if (this.items[this.index]){
          this.items[this.index].setAttribute('style', 'border: 2px solid red');
        }
      } else if (ev.key ==="Enter") {
        this.onEnter.emit({index: this.index})
      }
      this.activeElementIndex = this.index;


  }

  initStyle(index: number){
    if (this.items[index]){
      this.activeElementIndex=index;
      this.index = index;
      this.items[this.index].removeAttribute('style');
      (this.items[index] as HTMLElement).setAttribute('style', 'border: 2px solid red');
    }
  }

  updateItems(): void {
    this.items = this.el.nativeElement.querySelectorAll(this.selector);
  }

}

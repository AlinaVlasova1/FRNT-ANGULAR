import {Directive, Input} from '@angular/core';

@Directive({
  selector: '[appBlocksStyle]'
})
export class BlocksStyleDirective {
  @Input() selector: string;

  constructor() { }

}

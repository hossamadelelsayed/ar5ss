import { Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[highlight]' })
export class HighlightDirective {
  constructor(el: ElementRef) {
    el.nativeElement.style.color = 'red';
  }
}

import { Component, OnInit, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { Article } from '../_models/article.model';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss'],
  host: {
    '(document:click)': 'clickOutside($event)'
  }
})

export class PopUpComponent {
  @Input() article: Article;
  @Output() closePopup = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) { }

  clickOutside(event: Event) {
    if (this.elementRef.nativeElement.contains(event.target)) {
      this.closePopup.emit(true);
    }
  }
}

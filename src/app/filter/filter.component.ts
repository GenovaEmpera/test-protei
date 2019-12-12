import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
  host: {
    '(document:click)': 'clickOutside($event)'
  }
})
export class FilterComponent implements OnInit {
  @Input() filterList: any[];
  @Input() default: string;
  @Output() selectItem = new EventEmitter<any>();

  showDropdown = false;
  selectedItemName: string;
  showResetButton = false;

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
    if (!!this.default) {
      this.selectedItemName = this.default;
    }
  }

  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.showDropdown = false;
    }
  }

  reset() {
    this.showResetButton = false;
    this.showDropdown = false;
    this.selectedItemName = this.default;
    this.selectItem.emit(false);
  }

  select(item: any) {
    this.selectItem.emit(item);
    this.selectedItemName = item.username;
    this.showResetButton = true;
    this.toggleDropdown();
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collapse-indicator',
  templateUrl: './collapse-indicator.component.html',
  styleUrls: ['./collapse-indicator.component.scss'],
})
export class CollapseIndicatorComponent {
    @Input() settings: any;
    @Input() targetId: string;
    @Output() toggleExpand: any = new EventEmitter<any>();

    constructor() {
    }

    onClick() {
        if (this.settings) {
            this.settings.isExpand = !this.settings.isExpand;
        }
    }
}

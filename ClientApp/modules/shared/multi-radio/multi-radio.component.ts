import { Component, OnInit, Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { RadioOption } from './radioOption';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

const MULTISELECT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => MultiRadioComponent),
  multi: true
};

@Component({
  selector: 'app-multi-radio',
  templateUrl: './multi-radio.component.html',
  styleUrls: ['./multi-radio.component.scss'],
  providers: [MULTISELECT_VALUE_ACCESSOR]
})
export class MultiRadioComponent implements OnInit {
  @Input() options: Array<RadioOption>;
  model: number[];
  onModelChange: Function = (_: any) => { };
  onModelTouched: Function = () => { };
  constructor() { }

  ngOnInit() {
  }
 writeValue(value: any): void {
    if (value !== undefined) {
        this.model = value;
    }
}

registerOnChange(fn: Function): void {
    this.onModelChange = fn;
}

registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
}

  onSelectOption(optionId) {
    if (this.model !== optionId)
      this.model = optionId;
    this.onModelChange(this.model);
  }
}

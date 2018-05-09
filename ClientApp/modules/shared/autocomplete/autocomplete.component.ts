import { Component, Input, Output, EventEmitter, forwardRef, ElementRef, PLATFORM_ID, Inject } from '@angular/core';
import { AutoCompleteItem } from './autocompleteItem';
import { AutocompleteService } from './autocomplete.service';
import { AutocompleteParam } from './autocompleteParam';
import { Http } from '@angular/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { isPlatformBrowser } from '@angular/common';

const noop = () => { };
const AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AutocompleteComponent),
    multi: true
};
const KEY_DOWN = 40;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_LEFT = 37;
const KEY_ESC = 27;
const KEY_ENTER = 13;
const KEY_TAB = 9;
const KEY_BACKSPACE = 8;

@Component({
    selector: 'app-autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['./autocomplete.component.scss'],
    host: {
        '(document:click)': 'handleClick($event)',
    },
    providers: [AutocompleteService, AUTOCOMPLETE_CONTROL_VALUE_ACCESSOR]
})
export class AutocompleteComponent implements ControlValueAccessor {
    @Input() param: AutocompleteParam;
    @Output() public blur = new EventEmitter<void>();
    @Output() public ngModelChange: EventEmitter<any> = new EventEmitter();
    @Output() public onSelected = new EventEmitter<void>();
    public elementRef;

    private _onTouchedCallback: () => void = noop;
    private _onChangeCallback: (_: any) => void = noop;
    private _isRequesting: boolean = false;
    private _latestRequestString: string = '';
    private currentSelectOption = -1;
    public _results = [];
    public isInitialized: boolean = false;
    public _searchString: string = '';
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private _autocompleteService: AutocompleteService,
        myElement: ElementRef) {
        this.elementRef = myElement;
    }

    public registerOnChange(fn: any) {
        this._onChangeCallback = fn;
    }

    handleClick(event) {
        let clickedComponent = event.target;
        let inside = false;
        do {
            if (clickedComponent === this.elementRef.nativeElement) {
                inside = true;
            }
            clickedComponent = clickedComponent.parentNode;
        } while (clickedComponent);

        this.isInitialized = inside;
    }

    public registerOnTouched(fn: any) {
        this._onTouchedCallback = fn;
    }

    public writeValue(value: any) {
        this._searchString = value;
    }

    public onBlur() {
        const self = this;
        if (self.isBrowser) {
            setTimeout(() => self.isInitialized = false, 200);
        }
    }

    public keyupHandler(event: any) {
        if (event.keyCode === KEY_LEFT || event.keyCode === KEY_RIGHT || event.keyCode === KEY_TAB) {
            return;
        }

        if (event.keyCode === KEY_UP || event.keyCode === KEY_ENTER) {
            event.preventDefault();
        } else if (event.keyCode === KEY_DOWN) {
            event.preventDefault();
        } else if (event.keyCode === KEY_ESC) {
            return;
        } else {
            if (!this._searchString) {
                this._results = [];
                this.ngModelChange.emit(this._searchString);
                return;
            }
            this.changeValue();
        }
    }

    public keydownHandler(event: any) {
        const self = this;
        const increaseNumber = 1;
        const decreaseNumber = -1;
        const max = self._results.length > 0 ? self._results.length : -1;
        const min = max > 0 ? 0 : -1;
        if (event.keyCode === KEY_ENTER) {
            self.changeValue();
        } else if (event.keyCode === KEY_DOWN) {
            event.preventDefault();
            self.changeSelectOption(increaseNumber, min, max);
            self.getCurrentSelectItem();
        } else if (event.keyCode === KEY_BACKSPACE) {
            self.currentSelectOption = -1;
        } else if (event.keyCode === KEY_UP) {
            event.preventDefault();
            self.changeSelectOption(decreaseNumber, min, max);
            self.getCurrentSelectItem();
        } else if (event.keyCode === KEY_TAB) {
            self.getCurrentSelectItem();
            self.onBlur();
        } else if (event.keyCode === KEY_ESC) {
            event.preventDefault();
            self.onBlur();
        }
    }

    protected convertArray(array) {
        const newArray = [];
        for (const name of Object.keys(array)) {
            const list = array[name];
            let categoryName = name.replace(/([A-Z])/g, ' $1').trim();
            categoryName = categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
            for (const value of Object.keys(list)) {
                const newObject: AutoCompleteItem = { title: list[value], category: categoryName };
                newArray.push(newObject);
            }
        }
        return newArray;
    }

    protected canShowCategory(list, item, index) {
        let firstIndex = 0;
        for (let i = 0; i < list.length; i++) {
            if (JSON.stringify(list[i]['category']) === JSON.stringify(item['category'])) {
                firstIndex = i;
                break;
            }
        }
        return firstIndex === index && this.param.hasGroupTitle;
    }

    protected selectItem(item, index) {
        this._searchString = item.replace(/<[^>]+>/ig, '');
        this.ngModelChange.emit(this._searchString);
        this.currentSelectOption = index;
        this.isInitialized = false;
        this.onSelected.emit();
    }

    protected changeValue() {
        const self = this;
        this.isInitialized = !!this._searchString;
        this.ngModelChange.emit(this._searchString);
        if (!this._isRequesting) {
            this._autocompleteService.url = this.param.url;
            this.search();
        }
    }

    public onFocus() {
        this.currentSelectOption = -1;
        this.changeValue();
    }

    private search() {
        const self = this;
        if (!this._searchString || this.param.minimumQueryStringLength > this._searchString.length) {
            this._results = [];
            return;
        }
        this._autocompleteService.getAutocomplete(
            this._searchString, this.beforeSend.bind(self), this.onSuccess.bind(self), this.onFail.bind(self));
    }

    private beforeSend() {
        this._isRequesting = true;
        this._latestRequestString = JSON.parse(JSON.stringify(this._searchString));
    }

    private onSuccess(data) {
        this._isRequesting = false;
        this._results = this.convertArray(data);
        this.currentSelectOption = -1;
        if (this._searchString && this._latestRequestString !== this._searchString) {
            this.search();
        } else if (!this._searchString) {
            this._results = [];
        }
    }

    private onFail(error) {
        this._isRequesting = false;
        this._results = [];
    }

    private changeSelectOption(increaseNumber: number, min: number, max: number) {
        if (increaseNumber > 0) {
            if (this.currentSelectOption >= (max - 1)) this.currentSelectOption = (max - 1);
            else this.currentSelectOption += increaseNumber;
        } else if (increaseNumber < 0) {
            if (this.currentSelectOption <= min) this.currentSelectOption = min;
            else this.currentSelectOption += increaseNumber;
        }
    }

    private getCurrentSelectItem() {
        this._searchString = (this.currentSelectOption >= 0) ?
         this._results[this.currentSelectOption].title.replace(/<[^>]+>/ig, '') : this._searchString;
    }

    private currentHoverItem(index: number) {
        return index === this.currentSelectOption ? 'current-select-row' : '';
    }
}

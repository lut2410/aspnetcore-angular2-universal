import {
    NgModule,
    Component,
    Pipe,
    OnInit,
    DoCheck,
    HostListener,
    Input,
    ElementRef,
    Output,
    EventEmitter,
    forwardRef,
    IterableDiffers,
    OnDestroy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs/Rx';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Router } from '@angular/router';
import { IMultiSelectOption } from './multiSelectOption';
import { IMultiSelectSettings } from './multiSelectSettings';
import { IMultiSelectTexts } from './multiSelectTexts';
import { MobileService } from '../../core/mobile.service';
import { GlobalEventService } from '../services/global-events.service';
import { Subject } from 'rxjs/Subject';

const MULTISELECT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultiDropdownComponent),
    multi: true
};

@Component({
    selector: 'app-multi-dropdown',
    templateUrl: './multi-dropdown.component.html',
    styleUrls: ['./multi-dropdown.component.scss'],
    providers: [MULTISELECT_VALUE_ACCESSOR]
})
export class MultiDropdownComponent implements OnInit, OnDestroy, DoCheck, ControlValueAccessor {
    public isMobile: boolean = Boolean(this.mobieDetectSvc.isMobile());
    public isTablet: boolean = Boolean(this.mobieDetectSvc.isTablet());
    public isJobsPage: boolean;

    private ngUnsubscribe = new Subject<void>();

    @Input() options: Array<IMultiSelectOption>;
    @Input() settings: IMultiSelectSettings;
    @Input() texts: IMultiSelectTexts;
    @Output() selectionLimitReached = new EventEmitter();

    model: number[];
    title: string;
    differ: any;
    itemSelected: number = 0;
    isVisible: boolean = false;
    searchFilterText: string = '';
    defaultSettings: IMultiSelectSettings = {
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        dynamicTitleMaxItems: 3,
        maxHeight: '300px',
    };
    defaultTexts: IMultiSelectTexts = {
        checked: 'checked',
        checkedPlural: 'checked',
        searchPlaceholder: 'Search...',
        defaultTitle: 'Select',
    };

    onModelChange: Function = (_: any) => { };
    onModelTouched: Function = () => { };

    private onClick(e: MouseEvent) {
        const self = this;
        let parentFound = false;
        let target = e.srcElement;
        while (target !== null && !parentFound) {
            if (target === self.element.nativeElement) {
                parentFound = true;
            }
            target = target.parentElement;
        }
        if (!parentFound) {
            self.isVisible = false;
        }
    }

    constructor(
        private element: ElementRef,
        private differs: IterableDiffers,
        private mobieDetectSvc: MobileService,
        private globalEventService: GlobalEventService,
        private router: Router) {
        this.differ = differs.find([]).create(null);
    }

    ngOnInit() {
        const self = this;
        self.isJobsPage = self.router.isActive('/jobs', true);
        self.settings = Object.assign(self.defaultSettings, self.settings);
        self.texts = Object.assign(self.defaultTexts, self.texts);
        self.title = self.texts.defaultTitle;

        self.globalEventService.documentOnClickAnnounced
            .takeUntil(self.ngUnsubscribe)
            .subscribe(e => self.onClick(e));
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
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

    ngDoCheck() {
        const changes = this.differ.diff(this.model);
        if (changes) {
            this.updateNumSelected();
            this.updateTitle();
        }
    }

    toggleDropdown() {
        this.isVisible = !this.isVisible;
    }

    isSelected(option: IMultiSelectOption): boolean {
        if (!this.model)
            return false;
        else {
            let stringArray = [];
            this.model.forEach(item => {
                stringArray.push(item.toString());
            })
            return stringArray.indexOf(option.id.toString()) > -1;
        }
    }

    setSelected(event: Event, option: IMultiSelectOption) {
        event.stopPropagation();
        if (!this.model) this.model = [];
        const index = this.model.indexOf(option.id);
        if (index > -1) {
            this.model.splice(index, 1);
        } else {
            if (this.settings.selectionLimit === 0 || this.model.length < this.settings.selectionLimit) {
                this.model.push(option.id);
            } else {
                this.selectionLimitReached.emit(this.model.length);
                return;
            }
        }
        this.onModelChange(this.model);
    }

    updateNumSelected() {
        this.itemSelected = this.model && this.model.length || 0;
    }

    updateTitle() {
        if (!this.model) {
            return false;
        } else {
            let selectedItem;
            let modelStringArray = [];
            this.model.forEach(item => {
                modelStringArray.push(item.toString());
            })
            if (this.itemSelected === 0) {
                this.title = this.texts.defaultTitle;
            } else if (this.settings.dynamicTitleMaxItems >= this.itemSelected) {
                selectedItem = this.options
                    .filter((option: IMultiSelectOption) => modelStringArray.indexOf(option.id.toString()) > -1)
                    .map((option: IMultiSelectOption) => option.name);
                this.title = selectedItem;
            } else {
                selectedItem = this.options
                    .filter((option: IMultiSelectOption) => modelStringArray.indexOf(option.id.toString()) > -1)
                    .map((option: IMultiSelectOption) => option.name);
                this.title = this.itemSelected === 1 ? this.texts.checked : (selectedItem[0] + ' ... + ' + (this.itemSelected - 1) + ' more');
            }
        }
    }
}

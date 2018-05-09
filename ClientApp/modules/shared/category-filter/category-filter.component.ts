import {
    Component,
    OnInit,
    AfterViewInit,
    EventEmitter,
    Input,
    Output,
    ViewContainerRef,
    PLATFORM_ID,
    Inject,
    OnDestroy
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { JobsBusService } from '../services/jobs-bus.service';
import { TranslateService } from '@ngx-translate/core';
import { CategoryFilterDataService } from './category-filter-data.service';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { MobileService } from '../../core/mobile.service';
import { SpinnerService } from '../../core/spinner.service';
import { SearchConditionService } from '../../core/search-condition.service';
import { isPlatformBrowser } from '@angular/common';
import { Subject } from 'rxjs/Subject';
import { GlobalEventService } from '../services/global-events.service';

declare var $: any;

@Component({
    selector: 'app-category-filter',
    templateUrl: './category-filter.component.html',
    styleUrls: ['./category-filter.component.scss']
})

export class CategoryFilterComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() selectedCategories: any[];
    @Input() screen: string;
    @Output() clearSearch: EventEmitter<any> = new EventEmitter();
    @Output() onSelected: EventEmitter<any> = new EventEmitter();
    @Input() showResultField: any;
    @Input() device: string = 'desktop';
    public backupListItem: any = [];
    public html: any = [];
    public listItem: any = [];
    public summitedCategories: any = [];
    private _extendingCategoryList = [];
    public isJobsPage: boolean;
    private categoryInputClick: boolean = false;
    public isOpenCate: boolean;
    public isTablet: boolean = Boolean(this._mobieDetectSvc.isTablet());
    public isMobile: boolean = Boolean(this._mobieDetectSvc.isMobile());
    public firstSelectedCategoryName: string;
    public selectedItem: any;
    public selectedCategoryItems: any = [];
    private isBrowser = isPlatformBrowser(this.platformId);
    private ngUnsubscribe = new Subject<void>();
    private searchCondition = this.searchConditionService.get();
    public expandList: any = [];

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private globalEventService: GlobalEventService,
        private _categoryFilterDataService: CategoryFilterDataService,
        public toastr: ToastsManager,
        private spinnerService: SpinnerService,
        public translate: TranslateService,
        public _mobieDetectSvc: MobileService,
        private router: Router,
        private _jobsBusService: JobsBusService,
        private searchConditionService: SearchConditionService,
        vRef: ViewContainerRef) {
        const self = this;
        self.toastr.setRootViewContainerRef(vRef);
        _jobsBusService.messageCategoryFilterAnnounced$
            .takeUntil(self.ngUnsubscribe)
            .subscribe(() => self.clearSelectedList());
    }

    ngOnInit() {
        const self = this;
        self.showResultField = JSON.parse(self.showResultField);

        self.isJobsPage = self.router.isActive('/jobs', true);
        self._extendingCategoryList = [];
        self._categoryFilterDataService.getCategories()
            .toPromise()
            .then(data => {
                self.listItem = data;
                self.backupListItem = JSON.parse(JSON.stringify(self.listItem));
                self.reSelectItems();
                self.firstSelectedCategoryName = (self.selectedCategories && self.selectedCategories.length > 0) ?
                    self.getCategoryName(self.selectedCategories[0]) : '';
                self.generateExpandList();
            },
            error => {
                self.translate.get('ERROR_LIST.NOT_CATEGORY').subscribe(value => self.toastr.error(value));
            });
    }
    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    generateExpandList() {
        this.listItem.forEach((element, index) => {
            this.expandList[index] = false;
        });
    }

    preventClosing(event) {
        event.stopPropagation();
    }

    changeCategoryPanelSize() {
        const self = this;
        if (self.isBrowser) {
            setTimeout(function () {
                if ($('.category-filter__content').length > 0 && $('.selected-category-panel').length) {
                    const h1 = $('.category-filter__content')[0].clientHeight;
                    const h = $('.selected-category-panel')[0].clientHeight;
                    $('.category-list').css('max-height', (h1 - h) + 'px');
                }
            }, 200);
        }
    }

    ngAfterViewInit() {
        const self = this;
        self.globalEventService.documentOnClickAnnounced
            .takeUntil(self.ngUnsubscribe)
            .subscribe(e => self.onDocumentClick(e));
    }

    private onDocumentClick(e: MouseEvent) {
        const self = this;
        const $clicked = $(e.target);
        if (!$clicked.parents().hasClass('dropdown') &&
            (e.srcElement.className !== 'select2-selection__choice__remove') &&
            (e.srcElement.className !== 'clear-selection__option')) {
            self.isOpenCate = false;
        }
    }


    private addCategoryItemStyle(): string {
        if ((this.selectedCategories && this.selectedCategories.length > 1) && (this.screen === 'jobSearch')) {
            return 'category-filter__selected-items-text';
        }
        if ((this.selectedCategories && this.selectedCategories.length === 1) && (this.screen === 'jobSearch')) {
            return 'category-filter__selected-items-text--only-one';
        }
        if ((this.selectedCategories && this.selectedCategories.length > 1) && (this.screen === 'jobList')) {
            return 'category-filter__selected-items-text--joblist';
        }
        if ((this.selectedCategories && this.selectedCategories.length === 1) && (this.screen === 'jobList')) {
            return 'category-filter__selected-items-text--only-one-joblist';
        }
    }

    public toggoleCategory() {
        const self = this;
        self.isOpenCate = !self.isOpenCate;
    }

    public doneCategory(event) {
        const self = this;
        self.isOpenCate = false;
        self.categorySelected(event);
    }

    public categorySelected(event) {
        this.searchConditionService.set(this.searchCondition);
        this.isOpenCate = false;
        this.onSelected.emit(event);
    }

    public clearSelectedList() {
        const self = this;
        self.selectedCategories = [];
        self.firstSelectedCategoryName = '';
        self.selectedCategoryItems = [];
        self.listItem = JSON.parse(JSON.stringify(self.backupListItem));
        self.clearSearch.emit();
        self._extendingCategoryList = [];
    }

    public toggleCategoryCheckbox(item, event, parentCategoryNumber) {
        event.stopPropagation();
        const self = this;
        item.selected = !item.selected;
        if (item.selected) {
            if (self.listItem[parentCategoryNumber].id === item.id) {
                for (let j = 0; j < item.items.length; j++) {
                    item.items[j].selected = false;
                    self.removeItemFromSelectedList(item.items[j]);
                }
                self.selectedCategoryItems.push(item);
                self.selectedCategories.push(item.id);
            } else {
                self.listItem[parentCategoryNumber].selected = false;
                self.removeItemFromSelectedList(self.listItem[parentCategoryNumber]);
                self.selectedCategories.push(item.id);
                self.selectedCategoryItems.push(item);
            }
            self.firstSelectedCategoryName = self.getCategoryName(self.selectedCategories[0]);
        } else {
            self.removeItemFromSelectedList(item);
            self.firstSelectedCategoryName = (self.selectedCategories && self.selectedCategories.length > 0) ?
                self.getCategoryName(self.selectedCategories[0]) : '';
        }
    }

    public removeItemFromSelectedList(item) {
        const self = this;
        for (let i = 0; i < self.selectedCategories.length; i++) {
            if (self.selectedCategories[i] === item.id) {
                self.selectedCategories.splice(i, 1);
                self.selectedCategoryItems.splice(i, 1);
            }
        }
    }

    public removeItem(item) {
        const self = this;
        self.removeItemFromSelectedList(item);

        for (let j = 0; j < self.listItem.length; j++) {
            if (self.listItem[j].name === item.name) {
                self.listItem[j].selected = false;
            } else {
                for (let h = 0; h < self.listItem[j].items.length; h++) {
                    if (self.listItem[j].items[h].name === item.name) {
                        self.listItem[j].items[h].selected = false;
                    }
                }
            }
        }
        self.changeCategoryPanelSize();
    }

    public selectItem(event, item) {
        this.expandList[item] = !this.expandList[item];
        event.stopPropagation();
        const itemIndex = this._extendingCategoryList.indexOf(item);
        if (itemIndex === -1) this._extendingCategoryList.push(item);
        else {
            this._extendingCategoryList.splice(itemIndex, 1);
            if (!this._extendingCategoryList) this._extendingCategoryList = [];
        }
    }

    public getExtendingClass(index) {
        return this._extendingCategoryList.indexOf(index) > -1 ? 'glyphicon-triangle-bottom' : 'glyphicon-triangle-right';
    }

    private reSelectItems() {
        const self = this;
        for (let i = 0; i < self.selectedCategories.length; i++) {
            for (let index = 0; index < self.listItem.length; index++) {
                if (self.selectedCategories[i] === self.listItem[index].id) {
                    self.listItem[index].selected = true;
                    self.selectedCategoryItems.push(self.listItem[index]);
                    continue;
                }

                for (let childIndex = 0; childIndex < self.listItem[index].items.length; childIndex++) {
                    if (self.selectedCategories[i] === self.listItem[index].items[childIndex].id) {
                        self.listItem[index].items[childIndex].selected = true;
                        self.selectedCategoryItems.push(self.listItem[index].items[childIndex]);
                    }
                }
            }
        }
    }

    public getCategoryName(categoryId: string) {
        if (categoryId === '') return '';
        const self = this;
        for (let i = 0; i < self.selectedCategories.length; i++) {
            for (let index = 0; index < self.listItem.length; index++) {
                if (categoryId === self.listItem[index].id) {
                    return self.listItem[index].name;
                }

                for (let childIndex = 0; childIndex < self.listItem[index].items.length; childIndex++) {
                    if (categoryId === self.listItem[index].items[childIndex].id) {
                        return self.listItem[index].items[childIndex].name;
                    }
                }
            }
        }
    }
}

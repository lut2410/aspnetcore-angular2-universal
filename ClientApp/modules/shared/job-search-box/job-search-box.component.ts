import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    ViewContainerRef,
    OnDestroy,
    AfterViewInit,
    Input,
    Renderer2,
    PLATFORM_ID,
    Inject,
    OnChanges,
    SimpleChanges
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { JobsBusService } from '../services/jobs-bus.service';
import { CollapseIndicatorComponent } from '../../shared/collapse-indicator/collapse-indicator.component';
import { AutocompleteComponent } from '../autocomplete/autocomplete.component';
import { AutocompleteParam } from '../autocomplete/autocompleteParam';
import { environment } from '../../../environments';
import { IMultiSelectOption } from '../multi-dropdown/multiSelectOption';
import { IMultiSelectSettings } from '../multi-dropdown/multiSelectSettings';
import { IMultiSelectTexts } from '../multi-dropdown/multiSelectTexts';
import { APP_PATHS } from '../constants/appPaths';

import { JobSearchBoxDataService } from './job-search-box-data.service';
import { MobileService } from '../../core/mobile.service';

import dropdownOptionList from '../constants/dropdownOptionList';
import { SearchConditionService } from '../../core/search-condition.service';
import { CacheDataService } from '../../core/cache-data.service';
import baseContentForServerRendering from '../../shared/config/baseContent';
import { SEO_CONFIGS } from '../../shared/config/seoConfig';
import { UtilityService } from '../../shared/services/utility.service';

declare var $: any;

@Component({
    selector: 'app-job-search-box',
    templateUrl: './job-search-box.component.html',
    styleUrls: ['./job-search-box.component.scss'],
    providers: [AutocompleteComponent, JobSearchBoxDataService]
})
export class JobSearchBoxComponent implements OnInit, OnDestroy, OnChanges {
    @Input() currentPagePath: string;
    @Input() isSearchConditionsReady: boolean;
    @Output() onSearch: EventEmitter<any> = new EventEmitter();
    isCollapse: boolean = false;
    numberOfJobs: any;
    haveData: boolean;
    limitJobDisplay: any;
    settings: any = {
        isExpand: false
    };
    isJobsPage: boolean;

    public findJobButtonText = baseContentForServerRendering.findJobButtonText;
    private isMobile: boolean = Boolean(this._mobieDetectSvc.isMobile());
    private isTablet: boolean = Boolean(this._mobieDetectSvc.isTablet());
    private filterModal: any;
    public whatParam: AutocompleteParam = {
        placeholder: 'JOB_SEARCH.WHAT',
        url: environment.jobPortalApiUrl + 'Jobs/autocomplete',
        hasGroupTitle: true,
        minimumQueryStringLength: 2
    };

    public whereParam: AutocompleteParam = {
        placeholder: 'JOB_SEARCH.WHERE',
        url: environment.jobPortalApiUrl + 'Locations/autocomplete',
        hasGroupTitle: false,
        minimumQueryStringLength: 2
    };

    private isBrowser = isPlatformBrowser(this.platformId);

    private fields = {
        'what': { 'active': true },
        'where': { 'active': true },
        'category': { 'active': true },
        'extentOfWorks': { 'active': true },
        'professionalLevels': { 'active': true },
        'salary': { 'active': true }
    };

    public configs = [
        {
            'path': APP_PATHS.home,
            'hideFields': ['salary', 'professionalLevels'],
            'active': false
        },
        {
            'path': APP_PATHS.jobs,
            'hideFields': [],
            'active': true
        }
    ];
    private searchCondition = this.searchConditionService.get();
    // Job type
    extentOfWorks: IMultiSelectOption[] = dropdownOptionList.extentOfWorks;

    // Job position
    professionalLevels: IMultiSelectOption[] = dropdownOptionList.professionalLevels;

    private selectSettings: IMultiSelectSettings = {
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default',
        selectionLimit: 0,
        dynamicTitleMaxItems: 1,
        maxHeight: '300px'
    };

    private jobTypesSelectorConfig: IMultiSelectTexts = {
        checked: 'selected',
        checkedPlural: 'selected',
        searchPlaceholder: 'Search...',
        defaultTitle: 'All Job Types',
    };

    private jobPositionsSelectorConfig: IMultiSelectTexts = {
        checked: 'selected',
        checkedPlural: 'selected',
        searchPlaceholder: 'Search...',
        defaultTitle: 'All Position Levels',
    };

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private router: Router,
        private searchConditionService: SearchConditionService,
        private cacheDataService: CacheDataService,
        private jobSearchBoxDataService: JobSearchBoxDataService,
        private _jobsBusService: JobsBusService,
        private vRef: ViewContainerRef,
        private _utilService: UtilityService,
        private renderer: Renderer2,
        public toastr: ToastsManager,
        public translate: TranslateService,
        public _mobieDetectSvc: MobileService) {
        const self = this;
        self.toastr.setRootViewContainerRef(vRef);
        self.filterModal = self.isBrowser ? $('#filter-modal') : {};
    }

    ngOnInit() {
        const self = this;
        self.limitJobDisplay = 5000;

        self.hideFieldsPerPath(self.fields, self.configs);

        if (self.cacheDataService.getCache('jobsNum')) {
            self.numberOfJobs = self.cacheDataService.getCache('jobsNum');
        } else {
            self.jobSearchBoxDataService.getNumberOfJobs()
                .toPromise()
                .then(data => self.numberOfJobs = data)
                .catch(error => self.translate
                    .get('ERROR_LIST.NOT_JOB_COUNT')
                    .subscribe(value => self.toastr.error(value))
                );
        }
        if ((self.searchCondition.categories.length > 0) ||
            (self.searchCondition.professionalLevels.length > 0) ||
            (self.searchCondition.extentOfWorks.length > 0)) {
            self.haveData = true;
            self.settings.isExpand = true;
        }

        self.isJobsPage = self.router.isActive('/jobs', true);
    }

    ngOnDestroy() {
        if (this.isBrowser) {
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open').addClass('modal-open-overflow');
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.isSearchConditionsReady &&
            changes.isSearchConditionsReady.currentValue) {
            this.searchCondition = this.searchConditionService.get();
        }
      }

    public clearCategory(event) {
        this.searchCondition.categories = [];
        this.searchConditionService.clearCategory();
    }

    private hideFieldsPerPath = function (fields, configs) {
        if (configs) {
            configs.forEach(config => {
                if (config.path === this.currentPagePath) {
                    config.active = true;
                    Object.keys(fields).forEach(function (fieldKey) {
                        config.hideFields.forEach(hideField => {
                            fields[hideField].active = false;
                        });
                    });
                } else {
                    config.active = false;
                }
            });
        }
    };

    private onSelected(event) {
        this.doSearch(event);
    }

    doSearch(event) {
        this.searchConditionService.set(this.searchCondition);
        this.onSearch.emit();
    }

    public clearAllFilter(): void {
        const defaultCondition = {
            what: '',
            where: '',
            categories: [],
            extentOfWorks: [],
            professionalLevels: [],
            orderBy: this.searchCondition.orderBy
        };
        this.searchConditionService.set(defaultCondition);
        this.searchCondition = this.searchConditionService.get();
        if (this.isJobsPage) {
            this.onSearch.emit(event);
        }
        this._jobsBusService.announceCategoryFilter();
        this._jobsBusService.announceSalaryFilter();
    }

    public closeFilter() {
        if (!this.isBrowser) return;
        $('#filter-modal').modal('hide');
    }
}

import { Component, OnInit, ViewContainerRef, PLATFORM_ID, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationStart } from '@angular/router';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';
import { TranslateService } from '@ngx-translate/core';

import { JobsBusService } from '../../shared/services/jobs-bus.service';
import { JobService } from '../../shared/services/job/job.service';
import dropdownOptionList from '../../shared/constants/dropdownOptionList';

import { Job } from '../../shared/dto/job/job.dto';
import { MobileService } from '../../core/mobile.service';

import { Title, Meta } from '@angular/platform-browser';
import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';
import { APP_PATHS } from '../../shared/constants/appPaths';
import { SearchConditionService } from '../../core/search-condition.service';
import { SpinnerService } from '../../core/spinner.service';
import { isPlatformBrowser, Location } from '@angular/common';
import { GlobalEventService } from '../../shared/services/global-events.service';
import { Subject } from 'rxjs/Subject';
import { BannerAdsService } from '../../shared/services/banner-ads/banner-ads.service';
import { BannerAdsDto } from '../../shared/dto/banner-ads/banner-ads.dto';
import { SEO_CONFIGS } from '../../shared/config/seoConfig';
import { CategoryUrlParamService } from '../../shared/services/category/categoryUrl.service';
import { UtilityService } from '../../shared/services/utility.service';
import { JobOrderBy } from '../../shared/constants/jobOrderBy';
import { RadioOption } from '../../shared/multi-radio/radioOption';

declare var $: any;

@Component({
    selector: 'app-job-list',
    templateUrl: './job-list.component.html',
    styleUrls: ['./job-list.component.scss'],
    providers: [JobsBusService]
})

export class JobListComponent implements OnInit, OnDestroy {
    jobs: Job[];
    bannerAds: BannerAdsDto[] = [];
    jobsAndBannerAds: any[] = [];
    totalJobs: number;
    isMobile: boolean;
    isTablet: boolean;
    jobOrderBy: typeof JobOrderBy = JobOrderBy;
    currentJobOrderBySelected: JobOrderBy;
    latestJobOrderByValue: JobOrderBy;
    private searchCondition = this.searchConditionService.get();
    private isBrowser = isPlatformBrowser(this.platformId);
    private ngUnsubscribe = new Subject<void>();
    public currentPagePath: string;
    public extentOfWorkName: string;
    public professionalLevelName: string;
    public mainDisplaySummaryMessage = '';
    public jobsLength = 0;
    public jobOrderByOptions: Array<RadioOption>;
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    public currentPageIndex = 0;
    public totalItems = 0;
    public itemsPerPage = 27;
    public categoryList: any;
    public searchSummary = '';
    public categoryUrlParamList: any;
    public isSearchConditionsReady = false;

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private _categoryUrlParamService: CategoryUrlParamService,
        private globalEventService: GlobalEventService,
        private mobileService: MobileService,
        private router: Router,
        private jobService: JobService,
        private bannerAdsService: BannerAdsService,
        private searchConditionService: SearchConditionService,
        private spinnerService: SpinnerService,
        public toastr: ToastsManager,
        public translate: TranslateService,
        private _utilService: UtilityService,
        private _location: Location,
        private vRef: ViewContainerRef,
        private title: Title,
        private meta: Meta,
        private activatedRoute: ActivatedRoute) {
        const self = this;
        self.toastr.setRootViewContainerRef(vRef);
        self.currentPagePath = APP_PATHS.jobs;
        self.initDataForJobOrderOptions();
    }
    private initDataForJobOrderOptions() {
        this.jobOrderByOptions = [];
        this.jobOrderByOptions.push(new RadioOption(JobOrderBy.Relevant, 'JOB_SEARCH.MOST_RELEVANT'));
        this.jobOrderByOptions.push(new RadioOption(JobOrderBy.LatestDate, 'JOB_SEARCH.LATEST'));
    }

    ngOnInit(): void {
        const self = this;
        this.setEmptyFilter();
        this.searchCondition = this.searchConditionService.get();
        if (self.isBrowser) {
            window.scrollTo(0, 0);
        }
        self.isMobile = (Boolean)(self.mobileService.isMobile());
        self.isTablet = (Boolean)(self.mobileService.isTablet());
        self.currentJobOrderBySelected = self.searchConditionService.getJobOrderByCondition();
        this.latestJobOrderByValue = this.searchConditionService.getJobOrderByCondition();
        self.globalEventService.windowOnScrollAnnounced
            .takeUntil(self.ngUnsubscribe)
            .subscribe(self.stickySearchBox);
        const jobList = self.jobService.getJobListData();
        const isBackFromJobDetail = self.jobService.getStatusBackFromJobDetail();
        if (isBackFromJobDetail && jobList && jobList.length > 0) {
            self.rebuildJobList(jobList);
            return;
        }
        self.resetSearchingCondition();
        self._categoryUrlParamService.getCategoryUrlParams().toPromise()
            .then(data => {
                self.categoryUrlParamList = data;
            },
            error => {
                this.searchConditionService.set(self.searchCondition);
                this.searchConditionService.setJobListCurrentPage(1);
                this.isSearchConditionsReady = true;
                this.searchJobsAsync();
            }).then(() => {
                this.setFilterFromUrlParams(this.activatedRoute.snapshot.routeConfig.path);
                this.searchConditionService.set(self.searchCondition);
                this.searchConditionService.setJobListCurrentPage(1);
                this.isSearchConditionsReady = true;
                this.searchJobsAsync();
                this.setTitle();
            });
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    async onSearch() {
        this.searchCondition = this.searchConditionService.get();
        this._location.replaceState(this.getUrlFromFilter());
        this.setTitle();
        this.searchConditionService.setJobListCurrentPage(1);
        this.searchJobsAsync();
    }

    private setFilterFromUrlParams(currentRoute) {
        this.setFilterConfig();
        this.activatedRoute.params.subscribe((params: Params) => {
            switch (this.activatedRoute.snapshot.routeConfig.path) {
                case SEO_CONFIGS.RoutingPaths.JobSearchingList.OneParamURL:
                    this.setFilterFromParam(params['firstParam']);
                    break;
                case SEO_CONFIGS.RoutingPaths.JobSearchingList.TwoParamURL:
                    this.setFilterFromParam(params['firstParam']);
                    this.setFilterFromParam(params['secondParam']);
                    break;
                default:
                    break;
            }
        });
    }

    private setFilterFromParam(param) {
        const length = param.length;
        if (param.includes('-jobs-in-') && param.substring(length - 5, length) !== '-jobs') {
            this.searchCondition.what = this._utilService.removeSpecialCharacters(param.split('-jobs-in-')[0]).replace(/-/g, ' ');
            const categoryElement = this.categoryUrlParamList.find(p => p.urlParam === param.split('-jobs-in-')[1]);
            const id = categoryElement === undefined ? '' : categoryElement.id;
            if (this.searchCondition.categories.indexOf(id) === -1)
                this.searchCondition.categories.push(id);
        } else if (param.includes('-jobs')) {
            if (param.substring(length - 5, length) === '-jobs') {
                this.searchCondition.what = this._utilService.removeSpecialCharacters(param.split('-jobs')[0]).replace(/-/g, ' ');;
            }
        } else if (param.includes('jobs-in')) {
            const categoryElement = this.categoryUrlParamList.find(p => p.urlParam === param.split('jobs-in-')[1]);
            const id = categoryElement === undefined ? '' : categoryElement.id;
            if (this.searchCondition.categories.indexOf(id) === -1)
                this.searchCondition.categories.push(id);
        } else if (param.substring(0, 3) === 'in-') {
            this.searchCondition.where = param.substring(3, length).replace(/-/g, ' ');
        }
    }

    private setFilterConfig() {
        const self = this;
        let params;
        this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
            params = queryParams
        });
        const searchingObject = {
            categories: params.category ? params.category.split(SEO_CONFIGS.Delimiter) : [],
            keyword: (params.keywords && params.keywords !== '') ? params.keywords : '',
            jobTypes: params.jobtype ? params.jobtype.split(SEO_CONFIGS.Delimiter) : [],
            positions: params.position ? params.position.split(SEO_CONFIGS.Delimiter) : [],
            where: (params.where && params.where !== '') ? params.where : '',
        };
        searchingObject.categories.forEach(element => {
            const paramElement = this.categoryUrlParamList.find(p => p.urlParam === element);
            const id = paramElement === undefined ? '' : paramElement.id;
            if (self.searchCondition.categories.indexOf(id) === -1)
                self.searchCondition.categories.push(id);
        });
        searchingObject.jobTypes.forEach(element => {
            const paramElement = SEO_CONFIGS.JobTypeMapper.find(p => p.textKey === element);
            const id = paramElement === undefined ? '' : paramElement.id;
            if (self.searchCondition.extentOfWorks.indexOf(id) === -1)
                self.searchCondition.extentOfWorks.push(id);

        });

        searchingObject.positions.forEach(element => {
            const paramElement = SEO_CONFIGS.PositionMapper.find(p => p.textKey === element);
            const id = paramElement === undefined ? '' : paramElement.id;
            if (self.searchCondition.professionalLevels.indexOf(id) === -1)
                self.searchCondition.professionalLevels.push(id);
        });

        if (searchingObject.keyword !== '') {
            self.searchCondition.what = searchingObject.keyword.replace(/-/g, ' ').replace(/[+]/g, ' ');
        }

        if (searchingObject.where !== '') {
            self.searchCondition.where = searchingObject.where.replace(/-/g, ' ').replace(/[+]/g, ' ');
        }
    }

    private convertStringParamsToObject(stringParams) {
        const array = stringParams.searchString.split('_');
        const searchingObject = {
            text: '',
            categories: [],
            positions: [],
            jobTypes: [],
            location: ''
        };
        array.forEach(element => {
            if (element.includes('-jobs')) {
                searchingObject.text = element.split('-jobs')[0].replace(/-/gi, ' ');
            }
            if (element.includes('category-')) {
                searchingObject.categories = element.split('category-')[1].split(',');
            }
            if (element.includes('position-')) {
                searchingObject.positions = element.split('position-')[1].split(',');
            }
            if (element.includes('type-')) {
                searchingObject.jobTypes = element.split('type-')[1].split(',');
            }
            if (element.includes('in-')) {
                searchingObject.location = element.split('in-')[1].replace(/-/gi, ' ');
            }
        });
        return searchingObject;
    }


    public getSearchSummary() {
        const hasSearchCondition = this.searchConditionService.hasSearchJobCondidtions();
        if (hasSearchCondition) {
            let searchSummary = '';
            if (this.searchCondition.what != '') {
                searchSummary += SEO_CONFIGS.SummaryTemplate.For.replace('{0}', this.searchCondition.what);
            }
            if (this.searchCondition.where != '') {
                searchSummary += SEO_CONFIGS.SummaryTemplate.In.replace('{0}', this.searchCondition.where);
            }
            return searchSummary + '.';
        }
        return '';

    }

    private setTitle() {
        const self = this;
        let portalName = '';
        if (self.isJobsCentral)
            portalName = SEO_CONFIGS.Branchs.JobsCentral;
        else
            portalName = SEO_CONFIGS.Branchs.TalentCorp;

        let positionString = '';
        if (self.searchCondition.professionalLevels.length) {
            const positionArray = [];
            self.searchCondition.professionalLevels.forEach(element => {
                positionArray.push(dropdownOptionList.professionalLevels.find(item => item.id === element).name);
            });
            positionString = SEO_CONFIGS.SummaryTemplate.Position.replace('{0}', positionArray.join(', '));
        }

        let typeString = '';
        if (self.searchCondition.extentOfWorks.length) {
            const typeArray = [];
            self.searchCondition.extentOfWorks.forEach(element => {
                typeArray.push(dropdownOptionList.extentOfWorks.find(item => item.id === element).name);
            });
            typeString = typeArray.join(', ');
        }

        let categorySummary = '';
        if (self.searchCondition.categories.length) {
            const levelList = self.searchCondition.categories.map(function (val) {
                return self.categoryUrlParamList.find(p => p.id === val) === undefined ?
                    '' : self.categoryUrlParamList.find(p => p.id === val).name;
            });
            categorySummary += ' in ' + levelList.join(', ');
        }

        const keyword = this._utilService.uppercaseFirstLetter(self.searchCondition.what);
        const location = this._utilService.uppercaseFirstLetter(self.searchCondition.where);
        const description = SEO_CONFIGS.SummaryTemplate.JobsTitle.replace('{0}', positionString + keyword + ' ' + typeString)
            .replace('{1}', categorySummary)
            .replace('{2}', location !== '' ? location : 'Malaysia');
        self.title.setTitle(description + ' | ' + portalName);
    }

    private getLevelFromId(levelId) {
        return dropdownOptionList.professionalLevels.find(p => p.id == levelId).name;
    }

    private getJobTypeFromId(typeId) {
        return dropdownOptionList.extentOfWorks.find(p => p.id == typeId).name;

    }

    private resetSearchingCondition() {
        const self = this;
        self.searchCondition.categories = [];
        self.searchCondition.professionalLevels = [];
        self.searchCondition.extentOfWorks = [];
        self.searchCondition.where = '';
        self.searchCondition.what = '';
    }

    private setEmptyFilter() {
        const emptyCondition = {
            where: '',
            what: '',
            categories: [],
            extentOfWorks: [],
            professionalLevels: [],
            orderBy: this.searchCondition.orderBy
        }
        this.searchConditionService.set(emptyCondition);
    }

    private async rebuildJobList(jobList) {
        const self = this;
        self.jobs = jobList;
        self.buildJobandBannerList();
        await self.getBannerAdsListAsync();
        await self.searchAsync();
        self.jobService.setStatusBackFromJobDetail(false);
        self.buildJobandBannerList();
    }

    private async searchJobsAsync() {
        const self = this;
        if (self.isBrowser) window.scrollTo(0, 0);
        await self.getBannerAdsListAsync();
        await self.searchAsync();
        self.buildJobandBannerList();
    }

    onNavigate(link: any) {
        this.router.navigate(link);
    }

    private searchAsync() {
        const self = this;
        const isBackFromJobDetail = self.jobService.getStatusBackFromJobDetail();
        if (!isBackFromJobDetail)
            self.spinnerService.showSpinner();
        return self.jobService.getJobList(self.searchConditionService.get())
            .toPromise()
            .then((responsive: any) => {
                self.jobs = responsive.data;
                self.totalJobs = responsive.total;
                self.totalItems = responsive.totalPages * self.itemsPerPage;
                self.currentPageIndex = responsive.currentPageIndex;
                self.jobService.setJobListData(responsive.data);
                self.setDisplaySummaryJobs();
                self.stickySearchBox(null);
            })
            .catch(err => {
                self.totalItems = 0;
                self.currentPageIndex = 0;
                self.translate.get(err)
                    .subscribe(value => {
                        self.toastr.error(value);
                    });
            }).then(() => self.spinnerService.hideSpinner());
    }

    private setDisplaySummaryJobs() {
        const self = this;
        const hasSearchCondition = self.searchConditionService.hasSearchJobCondidtions();
        if (self.totalJobs === 0) {
            self.mainDisplaySummaryMessage = hasSearchCondition ?
                'JOB_SEARCH.NO_DATA_FOR_HAVING_CONDITION' :
                'JOB_SEARCH.NO_JOB_FOR_NO_CONDITION';
            return;
        }
        if (self.totalJobs === 1) {
            self.mainDisplaySummaryMessage = hasSearchCondition ? 'JOB_SEARCH.JOB_MATCHED' : 'JOB_SEARCH.JOB_AVAILABLE';
            return;
        }
        if (self.totalJobs > self.jobs.length) {
            self.mainDisplaySummaryMessage = hasSearchCondition ? 'JOB_SEARCH.JOBS_MATCHED' : 'JOB_SEARCH.JOBS_AVAILABLE';
            self.jobsLength = self.jobs.length;
            return;
        }
        self.mainDisplaySummaryMessage = hasSearchCondition ? 'JOB_SEARCH.JOBS_MATCHED' : 'JOB_SEARCH.JOBS_AVAILABLE';
    }

    private stickySearchBox(event: Event) {
        if (!this.isBrowser) return;

        if (window.top.pageYOffset > 120) {
            $('#search-job-in-job-list').addClass('sticky');
        } else {
            $('#search-job-in-job-list').removeClass('sticky');
        }
    }

    private openFilter() {
        if (!this.isBrowser) return;
        $('#filter-modal').modal();
        $('.modal-backdrop').remove();
    }

    private openSort() {
        if (this.isBrowser) {
            $('#sort-modal').modal();
            $('.modal-backdrop').remove();
        }
        this.latestJobOrderByValue = this.searchConditionService.getJobOrderByCondition();
    }


    public closeSort() {
        if (this.isBrowser) {
            $('#sort-modal').modal('hide');
        }
        this.selectJobOrderCondition(this.latestJobOrderByValue);
    }

    private getExtentOfWorkName(extentOfWork: number) {
        for (let i = 0; i < dropdownOptionList.extentOfWorks.length; i++) {
            if (dropdownOptionList.extentOfWorks[i].id === extentOfWork) {
                return dropdownOptionList.extentOfWorks[i].name;
            }
        }
        return '';
    }

    private getProfessionalLevel(professionalLevel: number) {
        for (let i = 0; i < dropdownOptionList.professionalLevels.length; i++) {
            if (dropdownOptionList.professionalLevels[i].id === professionalLevel) {
                return dropdownOptionList.professionalLevels[i].name;
            }
        }
        return '';
    }

    changePage(event) {
        this.currentPageIndex = event;
        this.searchConditionService.setJobListCurrentPage(this.currentPageIndex);
        this.searchJobsAsync();
    }

    private getBannerAdsListAsync() {
        return this.bannerAdsService.getBannerAds()
            .toPromise()
            .then(result => this.bannerAds = result)
            .catch(err => this.bannerAds = []);
    }

    private buildJobandBannerList() {
        const self = this;
        self.jobsAndBannerAds = [];
        if (self.bannerAds.length === 0) {
            self.jobsAndBannerAds = self.jobs;
            return;
        }
        let bannerAdsIndex = 0;
        for (let i = 0; i < self.jobs.length; i++) {
            self.jobsAndBannerAds.push(self.jobs[i]);
            if ((i === 4 || i === 9) && self.bannerAds[bannerAdsIndex] !== undefined) {
                self.jobsAndBannerAds.push(self.bannerAds[bannerAdsIndex]);
                bannerAdsIndex++;
            }
        }
    }

    public selectJobOrderCondition(orderBy: JobOrderBy) {
        if (this.currentJobOrderBySelected === orderBy) return;
        this.searchConditionService.setJobOrderByCondition(orderBy);
        this.latestJobOrderByValue = orderBy;
        this.currentJobOrderBySelected = this.searchConditionService.getJobOrderByCondition();
        this.searchJobsAsync();
    }

    private getUrlFromFilter() {
        var self = this;
        const categories = this.searchCondition.categories.map(function (val) {
            return self.categoryUrlParamList.find(p => p.id === val).urlParam;
        });
        const levels = this.searchCondition.professionalLevels.map(function (val) {
            return SEO_CONFIGS.PositionMapper.find(p => p.id === val).textKey;
        });
        const jobTypes = this.searchCondition.extentOfWorks.map(function (val) {
            return SEO_CONFIGS.JobTypeMapper.find(p => p.id === val).textKey;
        });

        const searchingObject = {
            categories: categories,
            level: levels,
            jobType: jobTypes,
            text: this.searchCondition.what,
            location: this.searchCondition.where
        }
        let urlArray = [];
        let queryParams = {
            keywords: null,
            category: null,
            jobtype: null,
            position: null,
            where: null,
        };
        let searchText = '';
        const commonCharRegex = /^[a-zA-Z0-9- ]*$/;
        if (searchingObject.text !== '') {
            if (searchingObject.categories.length === 0) {
                if (commonCharRegex.test(searchingObject.text) === false) {
                    queryParams.keywords = searchingObject.text;
                } else {
                    searchText = this._utilService.removeSpecialCharacters(searchingObject.text.replace(/ /g, '-') + '-jobs');
                    urlArray.push(searchText);
                }
            } else if (searchingObject.categories.length === 1) {
                if (commonCharRegex.test(searchingObject.text) === false) {
                    queryParams.keywords = searchingObject.text;
                    urlArray.push('jobs-in-' + searchingObject.categories[0]);
                } else {
                    searchText = this._utilService.removeSpecialCharacters(searchingObject.text.replace(/ /g, '-') + '-jobs-in-' + searchingObject.categories[0]);
                    urlArray.push(searchText);
                }
            } else if (searchingObject.categories.length > 1) {
                if (commonCharRegex.test(searchingObject.text) === false) {
                    queryParams.keywords = searchingObject.text;
                } else {
                    searchText = this._utilService.removeSpecialCharacters(searchingObject.text.replace(/ /g, '-') + '-jobs');
                    urlArray.push(searchText);
                }
                queryParams.category = searchingObject.categories.join(SEO_CONFIGS.Delimiter);
            }
        } else {
            if (searchingObject.categories.length === 1) {
                urlArray.push('jobs-in-' + searchingObject.categories[0]);
            } else {
                if (searchingObject.categories.length > 1) {
                    queryParams.category = searchingObject.categories.join(SEO_CONFIGS.Delimiter);
                }
            }
        }

        let location = '';
        if (searchingObject.location !== '') {
            if (commonCharRegex.test(searchingObject.location) === false) {
                queryParams.where = searchingObject.location;
            } else {
                location = this._utilService.removeSpecialCharacters('in-' + searchingObject.location.replace(/ /g, '-'));
                urlArray.push(location);
            }
        }
        if (searchingObject.level.length) {
            queryParams.position = searchingObject.level.join(SEO_CONFIGS.Delimiter);
        }
        if (searchingObject.jobType.length) {
            queryParams.jobtype = searchingObject.jobType.join(SEO_CONFIGS.Delimiter);
        }
        const queryMark = (!queryParams.category && !queryParams.jobtype && !queryParams.keywords && !queryParams.position && !queryParams.where)
            ? '' : '?';
        const queryUrl = $.param(this._utilService.removeNullProperties(queryParams));
        return '/jobs/search/' + urlArray.join('/') + queryMark + queryUrl;
    }
}



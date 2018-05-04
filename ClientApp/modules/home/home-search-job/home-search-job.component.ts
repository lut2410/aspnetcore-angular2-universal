import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ProjectSources } from '../../../enum';
import { environment } from '../../../environments';
import { SearchConditionService } from '../../core/search-condition.service';
import baseContentForServerRendering from '../../shared/config/baseContent';
import { SEO_CONFIGS } from '../../shared/config/seoConfig';
import { APP_PATHS } from '../../shared/constants/appPaths';
import { CategoryUrlParamService } from '../../shared/services/category/categoryUrl.service';
import { JobsBusService } from '../../shared/services/jobs-bus.service';
import { UtilityService } from '../../shared/services/utility.service';

@Component({
    selector: 'app-home-search-job',
    templateUrl: './home-search-job.component.html',
    styleUrls: ['./home-search-job.component.scss'],
    providers: [JobsBusService]
})

export class HomeSearchJobComponent {
    public findJobHeading = "";
    private readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    private readonly isTalentCorp = environment.projectSource === ProjectSources.TalentCorp;
    public currentPagePath: string;
    public categoryUrlParamList: any;

    private searchConditionService: SearchConditionService;
    private searchCondition;

    constructor(private router: Router, private _searchConditionService: SearchConditionService,
        private _categoryUrlParamService: CategoryUrlParamService,
        private _utilService: UtilityService) {
        this.currentPagePath = APP_PATHS.home;
        this.searchConditionService = _searchConditionService;
        if (this.isJobsCentral) {
            this.findJobHeading = baseContentForServerRendering.findJobPageHeading_JobsCentral;
        }
        if (this.isTalentCorp) {
            this.findJobHeading = baseContentForServerRendering.findJobPageHeading_TalentCorp;
        }
    }

    ngOnInit(): void {
        var self = this;
        self._categoryUrlParamService.getCategoryUrlParams().toPromise()
            .then(data => {
                self.categoryUrlParamList = data;
            },
            error => {
                console.log(error);
            })
    }

    onSearch(event: any) {
        this.searchCondition = this.searchConditionService.get();
        this.searchConditionService.setJobListCurrentPage(1);
        this.navigateToSearchedUrl();
    }

    private navigateToSearchedUrl() {
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

        switch (urlArray.length) {
            case 1:
                this.router.navigate(['/jobs/search', urlArray[0]], { queryParams: this._utilService.removeNullProperties(queryParams) });
                break;
            case 2:
                this.router.navigate(['/jobs/search', urlArray[0], urlArray[1]], { queryParams: this._utilService.removeNullProperties(queryParams) });
                break;
            default:
                this.router.navigate(['/jobs/search', ''], { queryParams: this._utilService.removeNullProperties(queryParams) });
                break;
        };
    }
}

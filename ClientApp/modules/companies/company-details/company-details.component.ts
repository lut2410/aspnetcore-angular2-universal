import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subject } from 'rxjs/Rx';

import { ProjectSources } from '../../../enum';
import { environment } from '../../../environments';
import { SearchConditionService } from '../../core/search-condition.service';
import { SpinnerService } from '../../core/spinner.service';
import { Company } from '../../shared/dto/company/company.dto';
import { Job } from '../../shared/dto/job/job.dto';
import { CompanyService } from '../../shared/services/company/company.service';
import { LinkifyService } from '../../shared/services/linkify/linkify.service';

declare var $: any;

const defaultLogo = './assets/jobscentral/employer-logos/emp_no-logo.png';

@Component({
    selector: 'app-company-details',
    templateUrl: './company-details.component.html',
    styleUrls: ['./company-details.component.scss'],
    providers: [CompanyService]
})
export class CompanyDetailsComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    private readonly isBrowser = isPlatformBrowser(this.platformId);
    private searchCondition = this.searchConditionService.get();
    public companyDescription: any;
    public company: Company = new Company({ banner: ' ', logo: ' ' });
    public jobs: Job[] = [];
    public isNoJob = false;
    public companyWebsite: string;
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;

    constructor(
        @Inject(PLATFORM_ID) private platformId: Object,
        private router: Router,
        private searchConditionService: SearchConditionService,
        private companyService: CompanyService,
        public translate: TranslateService,
        private activatedRoute: ActivatedRoute,
        private spinnerService: SpinnerService,
        private linkifyService: LinkifyService,
        public toastr: ToastsManager,
        vRef: ViewContainerRef,
        private title: Title) {
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        let self = this;
        if (self.isBrowser) {
            window.scrollTo(0, 0);
        }
        self.spinnerService.showSpinner();
        self.activatedRoute.paramMap
            .takeUntil(self.ngUnsubscribe)
            .map(params => params.get('id'))
            .flatMap(id => self.companyService.getCompanyDetails(id))
            .subscribe(company => {
                self.company = new Company(company.companyDetails);
                if (!self.company.logo) self.company.logo = defaultLogo;

                self.companyWebsite = company.companyDetails.homePageUrl != null ? company.companyDetails.homePageUrl.replace(/.*?:\/\//g, '') : '';
                self.jobs = company.jobs;
                self.isNoJob = company.jobs.length === 0 ? true : false;
                self.spinnerService.hideSpinner();
                self.companyDescription = self.checkLink(self.company.description);
                
                if (self.isJobsCentral) {
                    self.title.setTitle(`${self.company.name} | ${environment.pageTitleSuffix}`);
                }
            }, error => {
                console.log(error);
                self.isNoJob = true;
                self.translate.get('ERROR_LIST.NOT_JOB_LIST').toPromise().then(value => self.toastr.error(value));
                self.spinnerService.hideSpinner();
            });
    }

    ngOnDestroy(): void {
        let self = this;
        self.ngUnsubscribe.next();
        self.ngUnsubscribe.complete();
    }

    doSearch() {
        let self = this;
        self.searchCondition.what = 'company:"' + self.company.name + '"';
        self.searchConditionService.set(self.searchCondition);
        const queryParams = {
            keywords: 'company:"' + self.company.name + '"'
        }
        this.router.navigate(['/jobs/search', ''], { queryParams: queryParams });
    }

    private checkLink(text){
        let self = this;
        return self.linkifyService.linkify(text);
    }
}

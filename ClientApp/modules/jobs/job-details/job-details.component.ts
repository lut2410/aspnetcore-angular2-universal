import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs/Rx';

import { ProjectSources } from '../../../enum';
import { environment } from '../../../environments';
import { MobileService } from '../../core/mobile.service';
import { SpinnerService } from '../../core/spinner.service';
import dropdownOptionList from '../../shared/constants/dropdownOptionList';
import { Job } from '../../shared/dto/job/job.dto';
import { JobService } from '../../shared/services/job/job.service';
import { SecurityService } from '../../shared/services/security.service';
import { UtilityService } from '../../shared/services/utility.service';
import { LinkifyService } from '../../shared/services/linkify/linkify.service';
import { JobStatus } from '../../shared/enums/job.enum';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})

export class JobDetailsComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    public job = new Job();
    public isMobile: boolean;
    public isPublishingJob = true;
    public extentOfWorkName: string;
    public professionalLevelName: string;
    public categoriesName: Array<string>;
    public userInfo: any;
    public locationIconSource: string;
    public positionIconSource: string;
    public typeIconSource: string;
    public iconFolderName: string;
    public rootImageFolder: string;
    public jobDescription: any;
    public companyLink: Array<string>;

    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private jobService: JobService,
        private mobileService: MobileService,
        private utilityService: UtilityService,
        private spinnerService: SpinnerService,
        private securityService: SecurityService,
        private linkifyService: LinkifyService,
        private title: Title) {
    }

    ngOnInit() {
        const self = this;

        self.spinnerService.showSpinner();
        self.activatedRoute.paramMap
            .takeUntil(self.ngUnsubscribe)
            .map(params => params.get('id'))
            .flatMap(id => self.jobService.getJob(id))
            .subscribe(job => {
                self.job = job;
                self.extentOfWorkName = self.getExtentOfWorkName(self.job.extentOfWork);
                self.categoriesName = job.categories;
                self.professionalLevelName = self.getProfessionalLevel(self.job.professionalLevel);
                self.spinnerService.hideSpinner();
                self.jobDescription = self.checkLink(self.job.description);

                if (self.isJobsCentral) {
                    self.title.setTitle(`${self.job.title} | ${environment.pageTitleSuffix}`);
                }

                self.companyLink = [
                    '/companies',
                    self.utilityService.formatToMachineName(self.job.companyName, 5),
                    self.job.companyId
                ];

                self.isPublishingJob = job && job.status === JobStatus.Published;
            }, error => {
                if (error.status === 404) {
                    window.location.href = '/jobs';
                }
                self.spinnerService.hideSpinner();
            });

        if (self.isBrowser) {
            self.userInfo = self.securityService.getUserInfo();
            self.isMobile = self.mobileService.isMobile();
        }

        self.rootImageFolder = '../../../assets/images/';
        self.iconFolderName = self.rootImageFolder + (self.isJobsCentral ? 'job-detail' : 'talentcorp');

        self.locationIconSource = self.iconFolderName + '/glyphicon-map-marker.png';
        self.positionIconSource = self.iconFolderName + '/glyphicon-user.png';
        self.typeIconSource = self.iconFolderName + '/glyphicon-briefcase.png';
    }

    ngOnDestroy(): void {
        const self = this;
        self.ngUnsubscribe.next();
        self.ngUnsubscribe.complete();
    }

    public goBackJobList() {
        this.jobService.setStatusBackFromJobDetail(true);
        this.router.navigate(['/jobs']);
    }

    public applyJob() {
        const self = this;
        const url =
            `${environment.referenceLinks.candidateApp}app/my-applications` +
            `?jobcode=${self.job.jobCode}&source=${environment.projectSource}`;

        if (self.isBrowser) {
            window.location.href = url;
        }
    }

    public getExtentOfWorkName(extentOfWork: number) {
        for (let i = 0; i < dropdownOptionList.extentOfWorks.length; i++) {
            if (dropdownOptionList.extentOfWorks[i].id === extentOfWork) {
                return dropdownOptionList.extentOfWorks[i].name;
            }
        }
        return '';
    }

    public getProfessionalLevel(professionalLevel: number) {
        for (let i = 0; i < dropdownOptionList.professionalLevels.length; i++) {
            if (dropdownOptionList.professionalLevels[i].id === professionalLevel) {
                return dropdownOptionList.professionalLevels[i].name;
            }
        }
        return '';
    }

    public addOrDeleteFavoriteJob() {
        const self = this;
        if (!self.userInfo.isAuthenticated) {
            self.securityService.storePreviousUrlBeforeLogging();
            self.securityService.login();
            return;
        }
        if (self.job) {
            self.job.isFavorite = !self.job.isFavorite;
            self.jobService.addOrDeleteFavoriteJob(self.job.id).subscribe();
        }
    }

    public getCompanyLogo(logo: string) {
        if (!logo) {
            logo = '../../../assets/jobscentral/employer-logos/emp_no-logo.png';
        }
        return logo;
    }

    private checkLink(text) {
        const self = this;
        return self.linkifyService.linkify(text);
    }

}

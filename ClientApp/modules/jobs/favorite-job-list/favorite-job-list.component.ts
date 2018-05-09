import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { ProjectSources } from '../../../enum';
import { environment } from '../../../environments';
import { MobileService } from '../../core/mobile.service';
import { SpinnerService } from '../../core/spinner.service';
import { Job } from '../../shared/dto/job/job.dto';
import { JobService } from '../../shared/services/job/job.service';

@Component({
    selector: 'app-favorite-job-list',
    templateUrl: './favorite-job-list.component.html',
    styleUrls: ['./favorite-job-list.component.scss']
})
export class FavoriteJobListComponent implements OnInit {

    jobs: Job[];
    totalJobs: number = 0;
    isMobile: boolean;
    isTablet: boolean;
    isLoadingFavoriteJobs: boolean;

    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private mobileService: MobileService,
        private router: Router,
        private jobService: JobService,
        private spinnerService: SpinnerService,
        private toastr: ToastsManager,
        private translate: TranslateService,
        private vRef: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vRef);
        this.getFavoriteJobs();
    }

    ngOnInit() {
        if (this.isBrowser) {
            window.scrollTo(0, 0);
        }
        this.isMobile = (Boolean)(this.mobileService.isMobile());
        this.isTablet = (Boolean)(this.mobileService.isTablet());
    }

    getFavoriteJobs() {
        this.isLoadingFavoriteJobs = true;
        this.spinnerService.showSpinner();
        this.jobService.getFavoriteJobList().subscribe((jobs: any) => {
            this.jobs = jobs;
            this.totalJobs = jobs.length;
            this.spinnerService.hideSpinner();
            this.isLoadingFavoriteJobs = false;
        }, err => {
            this.spinnerService.hideSpinner();
            this.isLoadingFavoriteJobs = false;
            this.translate.get(err).subscribe(
                value => {
                    this.toastr.error(value);
                }
            );
        });
    }

    onNavigate(link: any) {
        this.router.navigate(link);
    }

}

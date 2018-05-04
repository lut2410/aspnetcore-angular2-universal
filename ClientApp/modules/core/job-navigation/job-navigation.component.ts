import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';

import { MobileService } from '../../core/mobile.service';

import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';
import { SecurityService } from '../../shared/services/security.service';
import { isPlatformBrowser } from '@angular/common';
import baseContentForServerRendering from '../../shared/config/baseContent';

declare var $: any;

@Component({
    selector: 'app-job-navigation',
    templateUrl: './job-navigation.component.html',
    styleUrls: ['./job-navigation.component.scss']
})
export class JobNavigationComponent implements OnInit {
    userInfo: any;
    isMobile: any;
    referenceLinks: any;
    jobPortalRelativeLinks: any;
    btnCloseIconSrc: string;

    public mainMenuBaseStringList = baseContentForServerRendering.mainMenu;
    public subMenuBaseStringList = baseContentForServerRendering.subMenu;
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    public readonly isTalentCorp = environment.projectSource === ProjectSources.TalentCorp;
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private mobileService: MobileService,
        private securityService: SecurityService) { }

    ngOnInit() {
        const self = this;
        this.userInfo = this.securityService.getUserInfo();
        this.isMobile = Boolean(this.mobileService.isMobile());

        const referenceLinkSuffix = '?source=' + environment.projectSource;
        this.referenceLinks = {
            candidateAppMyApplications: environment.referenceLinks.candidateApp + '/app/my-applications' + referenceLinkSuffix,
            candidateAppMyCalendar: environment.referenceLinks.candidateApp + '/app/my-calendar' + referenceLinkSuffix,
            candidateAppMyCv: environment.referenceLinks.candidateApp + '/app/my-cv' + referenceLinkSuffix
        };

        this.jobPortalRelativeLinks = {
            jobs: '/jobs',
            companies: '/companies',
            jobSeekers: '/job-seekers',
            employers: '/employers',
            favouriteJobs: '/jobs/favourite'
        };

        this.btnCloseIconSrc = this.isJobsCentral ? './assets/images/btn_close_black.svg' : './assets/images/btn_close.svg';

        if (self.isBrowser) {
            $('#navbar').on('shown.bs.collapse', function () {
                $('.layout-wrapper').css({
                    height: '100vh',
                    overflow: 'hidden'
                });
            });

            $('#navbar').on('hidden.bs.collapse', function () {
                $('.layout-wrapper').css({
                    height: 'auto',
                    overflow: 'visible'
                });
            });
        }
    }

    hideMenu() {
        if (this.isBrowser) {
            const navbarElement = $('#navbar');
            if (navbarElement) {
                navbarElement.collapse('hide');
            }
        }
    }
    
    logOut() {
        this.securityService.logOut();
    }

    editProfile() {
        this.securityService.editProfile();
    }

}

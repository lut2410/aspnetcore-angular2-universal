import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { SecurityService } from '../../modules/shared/services/security.service';
import { environment } from '../../environments';
import { ProjectSources } from '../../enum';

@Component({
    selector: 'app-job-seekers',
    templateUrl: './job-seekers.component.html',
    styleUrls: ['./job-seekers.component.scss']
})
export class JobSeekersComponent implements OnInit {

    public background: any;
    public signInBtnText: string;
    public signUpBtnText: string;
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    public readonly isTalentCorp = environment.projectSource === ProjectSources.TalentCorp;

    constructor(private securityService: SecurityService, private title: Title) {
        if (this.isJobsCentral) {
            title.setTitle('Log-in and Create Accounts| HiredNOW.com.my');
        }
    }

    ngOnInit() {
        if (this.isJobsCentral) {
            this.background = {
                desktopUrl: 'url(./assets/images/job-seekers/jobscentral_desktop_login.jpg)',
                tabletUrl: 'url(./assets/images/job-seekers/jobscentral_tablet_login.jpg)',
                mobileUrl: 'url(./assets/images/job-seekers/jobscentral_mobile_login.jpg)'
            };

            this.signInBtnText = 'Login with your hiredNow account';
            this.signUpBtnText = 'Don\'t have an account? <b>Sign up now</b>';
        }
        if (this.isTalentCorp) {
            this.background = {
                desktopUrl: 'url(./assets/images/job-seekers/talentcorp/talentcorp_candidate_login_desktop.jpg)',
                tabletUrl: 'url(./assets/images/job-seekers/talentcorp/talentcorp_candidate_login_tablet.jpg)',
                mobileUrl: 'url(./assets/images/job-seekers/talentcorp/talentcorp_candidate_login_mobile.jpg)'
            };

            this.signInBtnText = '<b>Sign In</b>';
            this.signUpBtnText = '<b>Sign Up</b>';
        }
    }

    signIn() {
        this.securityService.login();
    }

    signUp() {
        this.securityService.signUp();
    }
}

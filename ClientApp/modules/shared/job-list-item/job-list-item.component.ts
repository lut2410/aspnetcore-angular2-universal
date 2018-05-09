import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

import { ProjectSources } from '../../../enum';
import { environment } from '../../../environments';
import dropdownOptionList from '../../shared/constants/dropdownOptionList';
import { Job } from '../../shared/dto/job/job.dto';
import { JobService } from '../../shared/services/job/job.service';
import { UtilityService } from '../../shared/services/utility.service';
import DateTimeHelper from '../helpers/date-time.helper';

@Component({
    selector: 'app-job-list-item',
    templateUrl: './job-list-item.component.html',
    styleUrls: ['./job-list-item.component.scss'],
    providers: [JobService]
})

export class JobListItemComponent implements OnInit {
    @Input() job: Job;
    @Input() isHavingLogo = true;
    @Output() navigate: EventEmitter<any> = new EventEmitter();
    timeIconSource: string;
    locationIconSource: string;
    positionIconSource: string;
    typeIconSource: string;
    iconFolderName: string;
    rootImageFolder: string;
    jobLink: Array<string>;

    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;

    constructor(
        private jobService: JobService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private utilityService: UtilityService) {
    }

    ngOnInit() {
        const self = this;
        self.rootImageFolder = '../../../assets/images/';
        self.iconFolderName = self.rootImageFolder + (self.isJobsCentral ? 'job-detail' : 'talentcorp');

        self.timeIconSource = self.iconFolderName + '/glyphicon-time.png';
        self.locationIconSource = self.iconFolderName + '/glyphicon-map-marker.png';
        self.positionIconSource = self.iconFolderName + '/glyphicon-user.png';
        self.typeIconSource = self.iconFolderName + '/glyphicon-briefcase.png';
        self.jobLink = ['/jobs',
            self.utilityService.formatToMachineName(self.job.companyName, 5),
            self.utilityService.formatToMachineName(self.job.title, 5),
            self.job.id];

    }

    public getPeriodTimeFromPublishDate(stringDate: string): any {
        const publishDate = new Date(stringDate);
        const currentDate = new Date();
        return DateTimeHelper.calculateDurationFromDateTime(currentDate, publishDate);
    }

    public getSummary(job: Job) {
        if (!job) return '';
        if (job.summary) return job.summary;
        if (!job.description) return '';
        return this.replaceHtmlTagInSummary(job.description);
    }

    private replaceHtmlTagInSummary(data: string) {
        data = data.replace('<p>', ' ');
        const regex = /(<([^>]+)>)/ig;
        const maxSummaryLength = 400;
        const result = data.replace(regex, '');
        if (result.length <= maxSummaryLength) return result;
        return result.substr(0, maxSummaryLength) + '...';
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

    public getCompanyLogo(logo: string) {
        if (!logo) {
            logo = '../../../assets/jobscentral/employer-logos/emp_no-logo.png';
        }
        return logo;
    }
}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments';
import { ProjectSources } from '../../enum';

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})

export class JobsComponent {
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;

    constructor(private title: Title) {
        if (this.isJobsCentral) {
            title.setTitle('Search for Jobs and Careers in Malaysia | HiredNOW.com.my');
        }
    }
}

import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { environment } from '../../environments';
import { ProjectSources } from '../../enum';

@Component({
    selector: 'app-companies',
    templateUrl: './companies.component.html',
    styleUrls: ['./companies.component.scss']
})
export class CompaniesComponent implements OnInit {
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;

    constructor(private title: Title) {
        if (this.isJobsCentral) {
            title.setTitle('Search for Companies in Malaysia | HiredNOW.com.my');
        }
    }

    ngOnInit() {
    }

}

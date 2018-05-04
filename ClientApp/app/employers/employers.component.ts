import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments';
import { ProjectSources } from '../../enum';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-employers',
    templateUrl: './employers.component.html',
    styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    public readonly isTalentCorp = environment.projectSource === ProjectSources.TalentCorp;
    public hrToolReferenceUrl = environment.referenceLinks.hrTool;

    constructor(private title: Title) {
        if (this.isJobsCentral) {
            title.setTitle('Discover Companies and Employers in Malaysia | HiredNOW.com.my');
        }
    }

    ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments';

@Component({
    selector: 'app-sub-menu',
    templateUrl: './sub-menu.component.html',
    styleUrls: ['./sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {
    referenceLinks: any;

    constructor() { }

    ngOnInit() {
        const referenceLinkSuffix = '?source=' + environment.projectSource;
        this.referenceLinks = {
            candidateAppMyApplications: environment.referenceLinks.candidateApp + '/app/my-applications' + referenceLinkSuffix,
            candidateAppMyCalendar: environment.referenceLinks.candidateApp + '/app/my-calendar' + referenceLinkSuffix,
            candidateAppMyCv: environment.referenceLinks.candidateApp + '/app/my-cv' + referenceLinkSuffix
        };
    }

}

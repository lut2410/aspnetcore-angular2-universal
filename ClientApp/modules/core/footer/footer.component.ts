import { Component, OnInit } from '@angular/core';
import productSetting from '../../shared/config/config';
import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
    private _companyName = productSetting.companyName;
    private _socialNetworkLinks = productSetting.socialNetworkLinks;

    public companyFooterLogo = productSetting.imageFooterLogoSource;
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    public readonly isTalentCorp = environment.projectSource === ProjectSources.TalentCorp;
    public currentDate = Date.now();

    constructor() { }

    ngOnInit() {
    }

}

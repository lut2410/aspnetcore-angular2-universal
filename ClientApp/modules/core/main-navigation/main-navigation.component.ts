import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { MobileService } from '../../core/mobile.service';
import productSetting from '../../shared/config/config';
import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';
import baseContentForServerRendering from '../../shared/config/baseContent';

@Component({
  selector: 'app-main-navigation',
  templateUrl: './main-navigation.component.html',
  styleUrls: ['./main-navigation.component.scss']
})
export class MainNavigationComponent implements OnInit {
    public companyLogo: string = productSetting.imageLogoSource;
    public logoAlternativeText = '';
    isMobile: any;
    isHome: boolean;
    private isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;
    private isTalentCorp = environment.projectSource === ProjectSources.TalentCorp;

    constructor(private mobileService: MobileService, private location: Location) { }

    ngOnInit() {
        this.isMobile = this.mobileService.isMobile();
        if(this.isJobsCentral) {
            this.logoAlternativeText = baseContentForServerRendering.brands.jobsCentral;
        }
        if(this.isTalentCorp) {
            this.logoAlternativeText = baseContentForServerRendering.brands.talentCorp;
        }
    }
}

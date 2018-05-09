import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../../../shared/dto/company/company.dto';
import { UtilityService } from '../../../shared/services/utility.service';
import { TranslateService } from '@ngx-translate/core';
import { SearchConditionService } from '../../../core/search-condition.service';

@Component({
    selector: 'app-company-list-item',
    templateUrl: './company-list-item.component.html',
    styleUrls: ['./company-list-item.component.scss']
})
export class CompanyListItemComponent implements OnInit {
    @Input() company: Company;
    private searchCondition = this.searchConditionService.get();
    public local: string;
    public companyLink: Array<string>;

    constructor(
        public translate: TranslateService,
        private router: Router,
        private utilityService: UtilityService,
        private searchConditionService: SearchConditionService) { }

    ngOnInit() {
        const self = this;
        if (!self.company.logo) {
            self.company.logo = self.getDefaultLogo();
        }
        self.local = self.localOutputFilter(['Malaysia'], self.company);
        self.companyLink = self.generateLink();
    }

    getDefaultLogo() {
        return './assets/jobscentral/employer-logos/emp_no-logo.png';
    }

    localOutputFilter(countries, company): string {
        if (countries.indexOf(company.mainLocation.country) !== -1) {
            return company.mainLocation.city + (company.mainLocation.state !== '' ? ', ' + company.mainLocation.state : '');
        }

        return company.mainLocation.country;
    }

    generateLink() {
        const wordsNumber = 5;
        const link = ['/companies', this.utilityService.formatToMachineName(this.company.name, wordsNumber), this.company.id];
        return link;
    }

    doSearch() {
        this.searchCondition.what = this.company.name;
        this.searchConditionService.set(this.searchCondition);
    }
}

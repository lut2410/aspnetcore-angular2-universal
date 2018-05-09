import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CompanySearchBoxComponent } from '../company-search-box/company-search-box.component';

import { TranslateService } from '@ngx-translate/core';
import { ToastsManager, Toast } from 'ng2-toastr/ng2-toastr';

import { CompanyService } from '../../shared/services/company/company.service';

import { Company } from '../../shared/dto/company/company.dto';

import { Title } from '@angular/platform-browser';
import { environment } from '../../../environments';
import { ProjectSources } from '../../../enum';
import { SearchConditionService } from '../../core/search-condition.service';
import { SpinnerService } from '../../core/spinner.service';

@Component({
    selector: 'app-company-list',
    templateUrl: './company-list.component.html',
    styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
    public companies: Company[] = [];
    public companyTotal: number;
    public readonly isJobsCentral = environment.projectSource === ProjectSources.JobsCentral;

    constructor(private router: Router,
        private searchConditionService: SearchConditionService,
        private spinnerService: SpinnerService,
        private companyService: CompanyService,
        public toastr: ToastsManager,
        public translate: TranslateService,
        private title: Title) {
        if (this.isJobsCentral) {
            title.setTitle('Search for Companies in Malaysia | HiredNOW.com.my');
        }
    }

    ngOnInit() {
        this.search();
    }

    onSearch() {
        this.search();
    }

    private search() {
        this.spinnerService.showSpinner();
        this.companyService.getCompanyList(this.searchConditionService.getSearchCompanyCondition()).subscribe((companies: any) => {
            this.companies = companies;
            this.companyTotal = companies.length;
            this.spinnerService.hideSpinner();
        }, err => {
            this.spinnerService.hideSpinner();
            this.translate.get(err).subscribe(
                value => {
                    this.toastr.error(value);
                }
            );
        });
    }
}

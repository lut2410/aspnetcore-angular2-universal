import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/index';
import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanySearchBoxComponent } from './company-search-box/company-search-box.component';
import { CompanyService } from '../shared/services/company/company.service';
import { CompanyListItemComponent } from './company-list/company-list-item/company-list-item.component';

@NgModule({
    imports: [
        SharedModule,
        CompaniesRoutingModule
    ],
    declarations: [
        CompaniesComponent,
        CompanyDetailsComponent,
        CompanyListComponent,
        CompanySearchBoxComponent,
        CompanyListItemComponent
    ],
    providers: [
        CompanyService
    ]
})
export class CompaniesModule { }

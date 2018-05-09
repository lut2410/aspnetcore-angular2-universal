import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { CompanyListComponent } from './company-list/company-list.component';

const routes: Routes = [
    {
        path: 'companies',
        component: CompaniesComponent,
        data: { title: 'Discover Companies and Employers in Malaysia' },
        children: [
            { path: '', component: CompanyListComponent },
            { path: ':name/:id', component: CompanyDetailsComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CompaniesRoutingModule { }

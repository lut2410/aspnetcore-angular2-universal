import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../shared/guards/auth-guard.service';
import { FavoriteJobListComponent } from './favorite-job-list/favorite-job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobsComponent } from './jobs.component';
import { SEO_CONFIGS } from '../shared/config/seoConfig';

const routes: Routes = [
    {
        path: 'jobs',
        component: JobsComponent,
        data: { title: 'Search for Jobs and Careers in Malaysia' },
        children: [
            { path: '', component: JobListComponent },
            { path: SEO_CONFIGS.RoutingPaths.JobSearchingList.Default, component: JobListComponent },
            { path: SEO_CONFIGS.RoutingPaths.JobSearchingList.OneParamURL, component: JobListComponent },
            { path: SEO_CONFIGS.RoutingPaths.JobSearchingList.TwoParamURL, component: JobListComponent },
            { path: SEO_CONFIGS.RoutingPaths.JobDetail.FullParams, component: JobDetailsComponent },
            { path: 'favourite', component: FavoriteJobListComponent, canActivate: [AuthGuardService] }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class JobsRoutingModule { }

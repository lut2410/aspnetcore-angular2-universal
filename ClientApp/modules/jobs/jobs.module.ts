import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/index';
import { JobsRoutingModule } from './jobs-routing.module';

import { JobService } from '../shared/services/job/job.service';
import { JobsComponent } from './jobs.component';
import { JobListComponent } from './job-list/job-list.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { FavoriteJobListComponent } from './favorite-job-list/favorite-job-list.component';
import { BannerAdsService } from '../shared/services/banner-ads/banner-ads.service';
import { CategoryUrlParamService } from '../shared/services/category/categoryUrl.service';

@NgModule({
  imports: [
    SharedModule,
    JobsRoutingModule,
    RouterModule
  ],
  declarations: [JobsComponent, JobListComponent, JobDetailsComponent, FavoriteJobListComponent],
  providers: [
    JobService,
    BannerAdsService,
    CategoryUrlParamService
  ]
})
export class JobsModule { }

import { NgModule } from '@angular/core';

import { CoreModule } from '../core/core.module';
import { HomeRoutingModule } from './home-routing.module';

import { HomeComponent } from './home.component';
import { HomeSearchJobComponent } from './home-search-job/home-search-job.component';

@NgModule({
  imports: [
    CoreModule,
    HomeRoutingModule
  ],
  declarations: [HomeComponent, HomeSearchJobComponent]
})
export class HomeModule { }

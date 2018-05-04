import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { NgxPaginationModule } from 'ngx-pagination';

import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { MultiRadioComponent } from './multi-radio/multi-radio.component';
import { BannerAdsComponent } from './banner-ads/banner-ads.component';
import { CarouselComponent } from './carousel/carousel.component';
import { CategoryFilterDataService } from './category-filter/category-filter-data.service';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { CollapseIndicatorComponent } from './collapse-indicator/collapse-indicator.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { UnauthGuardService } from './guards/unauth-guard.service';
import { JobListItemComponent } from './job-list-item/job-list-item.component';
import { JobSearchBoxComponent } from './job-search-box/job-search-box.component';
import { MultiDropdownComponent } from './multi-dropdown/multi-dropdown.component';
import { MultiSelectSearchFilterPipe } from './multi-dropdown/multi-select-search-filter.pipe';
import { ConvertToMachineNamePipe } from './pipes/convert-to-machine-name.pipe';
import { DateFormatPipe } from './pipes/format-date.pipe';
import { TeaserTextPipe } from './pipes/teaser-text.pipe';
import { SalaryBoxComponent } from './salary-box/salary-box.component';
import { GlobalEventService } from './services/global-events.service';
import { LinkService } from './services/link.service';
import { SecurityService } from './services/security.service';
import { SessionStorageService } from './services/session-storage.service';
import { UtilityService } from './services/utility.service';
import { SubMenuComponent } from './sub-menu/sub-menu.component';
import { LinkifyService } from './services/linkify/linkify.service';
import { AutocompleteService } from './autocomplete/autocomplete.service';

const services = [
    SecurityService,
    SessionStorageService,
    CategoryFilterDataService,
    UtilityService,
    LinkifyService,
    AuthGuardService,
    UnauthGuardService,
    LinkService,
    GlobalEventService,
    AutocompleteService
];
const components = [
    CarouselComponent,
    JobSearchBoxComponent,
    CollapseIndicatorComponent,
    CategoryFilterComponent,
    AutocompleteComponent,
    MultiRadioComponent,
    MultiDropdownComponent,
    MultiSelectSearchFilterPipe,
    SalaryBoxComponent,
    JobListItemComponent,
    ConvertToMachineNamePipe,
    TeaserTextPipe,
    DateFormatPipe,
    SubMenuComponent,
    BannerAdsComponent,
];
const modules = [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpModule,
    // CollapseModule,
    ToastModule,
    TranslateModule,
    NgbModule,
    NgxPaginationModule,
];

@NgModule({
    imports: [...modules],
    exports: [
        ...modules,
        ...components
    ],
    declarations: [...components],
    providers: [...services]
})
export class SharedModule { }

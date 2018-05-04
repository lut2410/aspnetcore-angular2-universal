import { NgModule, Optional, SkipSelf } from '@angular/core';

import { SharedModule } from '../shared';
import { CacheDataService } from './cache-data.service';
import { FooterComponent } from './footer/footer.component';
import { JobNavigationComponent } from './job-navigation/job-navigation.component';
import { MainNavigationComponent } from './main-navigation/main-navigation.component';
import { MainSpinnerComponent } from './main-spinner/main-spinner.component';
import { MobileService } from './mobile.service';
import { SearchConditionService } from './search-condition.service';
import { SpinnerService } from './spinner.service';

const components = [
    MainNavigationComponent,
    JobNavigationComponent,
    MainSpinnerComponent,
    FooterComponent,
];

@NgModule({
    imports: [
        SharedModule,
    ],
    providers: [
        SearchConditionService,
        SpinnerService,
        MobileService,
        CacheDataService
    ],
    exports: [
        SharedModule,
        ...components
    ],
    declarations: [...components]
})

export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

}

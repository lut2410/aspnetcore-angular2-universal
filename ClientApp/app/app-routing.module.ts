import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UnauthGuardService } from '../modules/shared/guards/unauth-guard.service';
import { AuthenticationComponent } from './authentication/authentication.component';
import { EmployersComponent } from './employers/employers.component';
import { JobSeekersComponent } from './job-seekers/job-seekers.component';
import { LogOffComponent } from './log-off/log-off.component';

export const routes: Routes = [
    { path: 'employers', component: EmployersComponent },
    { path: 'job-seekers', component: JobSeekersComponent, canActivate: [UnauthGuardService] },
    { path: 'authentication', component: AuthenticationComponent },
    { path: 'logoff', component: LogOffComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

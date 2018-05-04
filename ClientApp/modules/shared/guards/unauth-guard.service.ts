import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { SecurityService } from '../services/security.service';


@Injectable()
export class UnauthGuardService implements CanActivate {

    constructor(private router: Router, private securityService: SecurityService) {

    }

    canActivate() {
        const userInfo = this.securityService.getUserInfo();
        if (!userInfo.isAuthenticated) {
            return true;
        }

        this.router.navigateByUrl('/');
        return false;
    }

}

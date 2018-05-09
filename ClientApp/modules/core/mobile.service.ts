import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import * as MobileDetect from 'mobile-detect';

@Injectable()
export class MobileService {

    private deviceObj: any = {}
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private router: Router) {
        const self = this;
        if (self.isBrowser) {
            self.deviceObj = new MobileDetect(window.navigator.userAgent);
        }
    }

    isMobile() {
        const self = this;
        if (self.isBrowser) {
            // Treat Ipad landscape as desktop
            if (self.deviceObj.mobile() === 'iPad' && window.matchMedia('(orientation: landscape)').matches) {
                return false;
            } else {
                return self.deviceObj.mobile();
            }
        } else {
            return true;
        }

    }

    isTablet() {
        const self = this;
        if (self.isBrowser) {
            return self.deviceObj.tablet();
        } else {
            return false;
        }
    }

    isCurrentPath(path) {
        return this.router.isActive(path, true);
    }
}

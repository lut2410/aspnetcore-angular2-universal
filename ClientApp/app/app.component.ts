import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { Meta, MetaDefinition, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'; //TODO: update to A5
import { Subject } from 'rxjs/Rx';

import { environment } from '../environments';
import { LinkService } from '../modules/shared/services/link.service';
import { SecurityService } from '../modules/shared/services/security.service';

const defaultLanguage = 'en';
const defaultHeaderTags = {
    title: `${environment.pageTitle}`,
    titleSuffix: `${environment.pageTitleSuffix}`,
    meta: <MetaDefinition[]>[
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
            name: 'description',
            content:
            `Find jobs and vacancies in Malaysia. Explore careers and discover top employers.
        Get hired right now on hiredNow.com.my.`,
        },
        { property: 'og:image', content: 'http://hirednow.com.my/assets/jobscentral/hirednowsharednow.jpg' },
        { property: 'og:image:secure_url', content: 'https://hirednow.com.my/assets/jobscentral/hirednowsharednow.jpg' },
        { property: 'og:image:type', content: 'image/jpeg' },
        { property: 'og:image:width', content: '600' },
        { property: 'og:image:height', content: '315' },
    ],
    links: [
        { rel: 'icon', type: 'image/x-icon', href: `assets/${environment.projectSource}/favicon.ico` },
    ]
};

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    private ngUnsubscribe = new Subject<void>();
    private isBrowser = isPlatformBrowser(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private translate: TranslateService,
        private securityService: SecurityService,
        private title: Title,
        private meta: Meta,
        private linkService: LinkService,
        private activatedRoute: ActivatedRoute,
        private router: Router) {
        translate.setDefaultLang(defaultLanguage);
        translate.use(defaultLanguage);
    }

    ngOnInit() {
        const self = this;
        self._changeTitleOnNavigation();
        if (self.isBrowser) {
            self.securityService.handleWindowCallback(); // TODO: Need to handle on server
        }
    }
    ngOnDestroy(): void {
        const self = this;
        self.ngUnsubscribe.next();
        self.ngUnsubscribe.complete();
    }

    private _changeTitleOnNavigation() {
        const self = this;
        self.router.events
            .takeUntil(self.ngUnsubscribe)
            .filter(event => event instanceof NavigationEnd)
            .map(() => self.activatedRoute)
            .map(route => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .filter(route => route.outlet === 'primary')
            .flatMap(route => route.data)
            .subscribe(data => self._updateTitleAndMeta(data));
    }

    private _updateTitleAndMeta(data: any) {
        const self = this;
        data = data || {};
        const title = `${data.title || defaultHeaderTags.title} | ${data.titleSuffix || defaultHeaderTags.titleSuffix}`;
        const metaTags = defaultHeaderTags.meta.concat(Array.isArray(data.meta) ? data.meta : []);
        const linkTags = defaultHeaderTags.links.concat(Array.isArray(data.links) ? data.links : []);

        self.title.setTitle(title);
        for (const tag of metaTags) self.meta.updateTag(tag);
        for (const tag of linkTags) self.linkService.addTag(tag);
    }
}


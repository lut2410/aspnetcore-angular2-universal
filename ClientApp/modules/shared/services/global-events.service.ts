import { Injectable, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class GlobalEventService {
    private onClickSource = new Subject<MouseEvent>();
    private onReadySource = new Subject<Event>();
    private onScrollSource = new Subject<UIEvent>();

    documentOnClickAnnounced = this.onClickSource.asObservable();
    documentOnReadyAnnounced = this.onReadySource.asObservable();
    windowOnScrollAnnounced = this.onScrollSource.asObservable();

    private isBrowser = isPlatformBrowser(this.platformId);

    constructor( @Inject(PLATFORM_ID) private platformId) {
        const self = this;
        if (self.isBrowser) {
            document.addEventListener('click', e => self.onClickSource.next(e));
            document.addEventListener('ready', e => self.onReadySource.next(e));
            window.addEventListener('scroll', e => self.onScrollSource.next(e));
        }
    }
}
